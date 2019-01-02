import {
  assert,
} from '../assertions/assert';
import {
  createSound,
} from '../functions/createSound';
import {
  generateAudioPanelElement,
} from '../functions/generateAudioPanelElement';
import {
  Fade,
} from '../Fade/Fade';
import {
  getOneOrMany,
} from '../functions/getOneOrMany';
import {
  Group,
} from '../Group/Group';
import {
  IFadeOptions,
} from '../Fade/IFadeOptions';
import {
  IGroup,
} from '../Group/IGroup';
import {
  IManagerCreateSoundOptions,
} from '../interfaces/IManagerCreateSoundOptions';
import {
  IGroupsMap,
} from './IGroupsMap';
import {
  IGroupOptions,
} from '../Group/IGroupOptions';
import {
  IPlaylistOptions,
} from '../Playlist/IPlaylistOptions';
import {
  IPlaylistsMap,
} from './IPlaylistsMap';
import {
  ISound,
} from '../Sound/ISound';
import {
  ISoundGroupIdentifier,
} from '../interfaces/ISoundGroupIdentifier';
import {
  IManager,
} from './IManager';
import {
  IManagerOptions,
} from './IManagerOptions';
import {
  IPlaylist,
} from '../Playlist/IPlaylist';
import {
  ISoundsMap,
} from '../Group/ISoundsMap';
import {
  ISubmanagerMap,
} from './ISubmanagerMap';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  Playlist,
} from '../Playlist/Playlist';
import {
  updateAudioPanelElement,
} from '../functions/updateAudioPanelElement';
import { doToOneOrMany } from '../functions/doToOneOrMany';
import { nameOrAllKeys } from '../functions/oneKeyOrAllKeys';

export class Manager implements IManager {
  get type() {
    return NodeTypes.Manager;
  }

  private __groups: IGroupsMap = Object.freeze({});
  get groups() {
    return this.__groups;
  }

  private __playlists: IPlaylistsMap = Object.freeze({});
  get playlists() {
    return this.__playlists;
  }

  private __submanagers: ISubmanagerMap = Object.freeze({});
  get submanagers() {
    return this.__submanagers;
  }

  private __audioPanelElement: HTMLElement | null = null;
 
  public readonly isWebAudio: () => boolean;
  public readonly getAudioContext: () => AudioContext;
  public readonly getGainNode: () => GainNode;
  public readonly getAnalyserNode: () => AnalyserNode;
  public readonly getVolume: () => number;
  public readonly setVolume: (value: number) => this;

  constructor(options?: IManagerOptions) {
    const opts = options || {};
    const {
      groups,
      context,
      masterVolume,
    } = opts;

    this.isWebAudio = () => true;
    if (context) {
      this.getAudioContext = () => context;
    } else if (
      AudioContext ||
      // @ts-ignore
      webkitAudioContext)
    {
      const context = new (
        AudioContext ||
        // @ts-ignore
        webkitAudioContext
      )();

      this.getAudioContext = () => context;
    } else {
      this.isWebAudio = () => false;
      this.getAudioContext = () => {
        throw new Error();
      };
    }

    if (this.isWebAudio()) {
      const analyserNode = this.getAudioContext().createAnalyser();
      this.getAnalyserNode = () => analyserNode;
      const gainNode = this.getAudioContext().createGain();
      this.getGainNode = () => gainNode;
  
      this.getInputNode().connect(this.getOutputNode());
      this.getOutputNode().connect(this.getAudioContext().destination);

      this.getVolume = () => this.getGainNode().gain.value;
      this.setVolume = (value: number) => {
        this.getGainNode().gain.setValueAtTime(
          value,
          this.getAudioContext().currentTime,
        );

        this.updateAllAudioElementsVolume();

        return this;
      };
    } else {
      this.getAnalyserNode = () => {
        throw new Error();
      };

      this.getGainNode = () => {
        throw new Error();
      };

      let volume = 1;
      this.getVolume = () => volume;
      this.setVolume = (value: number) => {
        volume = value;
        return this.updateAllAudioElementsVolume();
      };
    }

    this.__groups = Object.freeze({
      default: this.createGroup(),
    });

    if (groups) {
      this.__groups = Object.freeze({ ...groups, });
      Object.keys(this.groups).forEach((groupName) => {
        const group = this.groups[groupName];
        if (this.isWebAudio()) {
          group.getOutputNode().connect(this.getInputNode());
        }
      });
    }

    if (typeof masterVolume !== 'undefined') {
      this.setVolume(masterVolume);
    }
  }

  public getInputNode() {
    return this.getAnalyserNode();
  }

  public getOutputNode() {
    return this.getGainNode();
  }

  public createGroup(options?: IGroupOptions) {
    if (this.isWebAudio()) {
      return new Group(Object.assign({}, options, {
        context: this.getAudioContext(),
      }));
    } else {
      return new Group(Object.assign({}, options));
    }
  }

  public addGroup(name: string, options: IGroupOptions) {
    const group = this.createGroup(options);
    this.addGroups({
      [name]: group,
    });

    return group;
  }

  public addGroups(groups: IGroupsMap) {
    const names = Object.keys(groups);
    names.forEach((groupName) => assert(!(groupName in this.groups)));
    if (this.isWebAudio()) {
      names.forEach((groupName) => {
        const group = groups[groupName];
        if (group.isWebAudio()) {
          /* Chain the group's output node to the manager's input node. */
          group.getOutputNode().connect(this.getInputNode());
        }
      });
    }

    this.__groups = Object.freeze({
      ...this.groups,
      ...groups,
    });

    return this;
  }

  public getGroups(name: string): IGroup;
  public getGroups(names: string[]): IGroup[];
  public getGroups(nameOrNames: string | string[]): IGroup | IGroup[] {
    return getOneOrMany(nameOrNames as string, this.groups);
  }

  public removeGroups(name: string): IManager;
  public removeGroups(name: string[]): IManager;
  public removeGroups(names: string | string[]): IManager {
    let arr: string[];

    if (typeof names === 'string') {
      arr = [ names, ];
    } else {
      arr = names;
    }

    const groups = { ...this.groups, };
    arr.forEach((groupName) => {
      const group = groups[groupName];
      if (group.isWebAudio()) {
        group.getOutputNode().disconnect();
      }

      delete groups[groupName];
    });

    this.__groups = Object.freeze(groups);

    if (!('default' in this.groups)) {
      /* Re-add a (now-empty) default group. */
      if (this.isWebAudio()) {
        this.addGroup('default', { context: this.getAudioContext(), });
      } else {
        this.addGroup('default', this.createGroup());
      }
    }

    return this;
  }

  public removeAllGroups() {
    return this.removeGroups(Object.keys(this.groups));
  }

  public playGroups(name: string): Promise<Event[]>;
  public playGroups(name: string[]): Promise<Event[]>;
  public playGroups(names: string | string[]): Promise<Event[]> {
    let arr: string[];
    if (typeof names === 'string') {
      arr = [ names, ];
    } else {
      arr = names;
    }

    return new Promise((resolve) => (
      Promise.all(arr.map((name) => (
        this.getGroups(name).playAllSounds()
      ))).then((val) => (
        resolve(val.reduce((prev, curr) => prev.concat(curr)))
      ))
    ));
  }

  public getGroupVolume(name: string = 'default') {
    return this.getGroups(name).getVolume();
  }

  public setGroupVolume(value: number, groupName: string = 'default') {
    this.getGroups(groupName).setVolume(value);
    return this;
  }

  public createFade(options?: IFadeOptions) {
    return new Fade(options);
  }

  public createPlaylist(options: IPlaylistOptions) {
    const opts = options || {};
    return new Playlist({ ...opts, });
  }

  public addPlaylist(name: string, options: Array<ISoundGroupIdentifier | string> | IPlaylistOptions) {
    const playlist = Array.isArray(options) ?
      this.createPlaylist({ ids: options, }) :
      this.createPlaylist(options);

    this.addPlaylists({
      [name]: playlist,
    });

    return playlist;
  }

  public addPlaylists(playlists: IPlaylistsMap) {
    const playls = playlists || {};
    const names = Object.keys(playls);
    names.forEach((playlistName) => assert(!(playlistName in this.playlists)));

    this.__playlists = Object.freeze({
      ...this.playlists,
      ...playls,
    });

    return this;
  }

  public getPlaylists(name: string): IPlaylist;
  public getPlaylists(names: string[]): IPlaylist[];
  public getPlaylists(names: string | string[]): IPlaylist | IPlaylist[] {
    return getOneOrMany(names as string[], this.playlists);
  }

  public removePlaylists(name: string): IManager;
  public removePlaylists(names: string[]): IManager;
  public removePlaylists(names: string | string[]): IManager {
    const playls = { ...this.playlists, };
    if (typeof names === 'string') {
      delete playls[names];
    } else {
      names.forEach((name) => {
        delete playls[name];
      });
    }

    this.__playlists = Object.freeze(playls);

    return this;
  }

  public removeAllPlaylists() {
    return this.removePlaylists(Object.keys(this.playlists));
  }

  public async playPlaylist(name: string) {
    const playlist = this.getPlaylists(name);
    console.log(`Playing playlist ${name}.`);
    let events: Event[] = [];
    let looped = 0;
    for (let ii = 0; ii < playlist.ids.length; ii += 1) {
      const id = playlist.ids[ii];
      const sound = this.getSounds(id.soundName, id.groupName);

      console.log(`${id.groupName}.${id.soundName} starting.`);

      const event = await sound.play(
        /* Overrides the sound's fade with the playlist fade. This argument is
         * ignored if it's falsy. */ 
        playlist.fade,
      );

      events.push(event);

      console.log(`${id.groupName}.${id.soundName} ending.`);

      if (ii === playlist.ids.length -1) {
        if (playlist.callback) {
          console.log(`Firing playlist ${name} callback.`);
          playlist.callback(events);
        }

        events = [];
  
        if (playlist.loop) {
          console.log(`Looping playlist ${name}.`);
          /* This value is incremented when the loop begins a new iteration so
           * it must be -1 rather than 0. */
          if (typeof playlist.loop === 'number' &&
              playlist.loop >= 1 &&
              playlist.loop % 1 === 0)
          {
            /* Allow integers to be used for the loop value, causing the
             * playlist to loop that many times. */
            if (playlist.loop > looped) {
              looped += 1;
              ii = -1;
            }
          } else {
            ii = -1;
          }
        }
      }
    }
  }

  public playPlaylists(name: string): Promise<void>;
  public playPlaylists(names: string[]): Promise<void>;
  public playPlaylists(names: string | string[]): Promise<void> {
    if (typeof names === 'string') {
      return this.playPlaylist(names);
    } else if (Array.isArray(names)) {
      return new Promise((resolve) => {
        Promise.all(names.map((name) => this.playPlaylist(name))).then(() => (
          resolve()
        ));
      });
    }

    throw new Error();
  }

  public stopPlaylists(name: string): IManager;
  public stopPlaylists(names: string[]): IManager;
  public stopPlaylists(names: string | string[]): IManager {
    let arr: string[] = [];
    if (typeof names === 'string') {
      arr = [ names, ];
    } else {
      arr = names;
    }

    const stopped: {
      [key: string]: {
        [key: string]: true,
      },
    } = {};

    arr.forEach((name) => {
      this.getPlaylists(name).ids.forEach((id) => {
        if (!stopped[id.groupName]) {
          stopped[id.groupName] = {};
        } else if (stopped[id.groupName][id.soundName]) {
          /* Skip this one as we've already stopped it. */
          return;
        }

        this.getSounds(id.soundName, id.groupName).stop();
        stopped[id.groupName][id.soundName] = true;
      });
    }, []);

    return this;
  }

  public createSound(options: IManagerCreateSoundOptions): Promise<ISound> {
    if (this.isWebAudio()) {
      return createSound({
        ...options,
        context: this.getAudioContext(),
        manager: this,
      });
    } else {
      return createSound({
        ...options,
        manager: this,
      });
    }
  }

  public addSound(
    name: string,
    options: IManagerCreateSoundOptions,
    groupName: string = 'default',
  ): Promise<ISound>
  {
    const opts = options || {};
    return new Promise((resolve) => {
      this.createSound(opts).then((sound) => {
        this.addSounds({
          [name]: sound,
        }, groupName);

        return resolve(sound);
      });
    });
  }

  public addSounds(sounds: ISoundsMap, groupName: string = 'default') {
    this.getGroups(groupName).addSounds(sounds);
    return this;
  }

  public getSounds(name: string, groupName?: string): ISound;
  public getSounds(names: string[], groupName?: string): ISound[];
  public getSounds(names: string | string[], groupName: string = 'default'): ISound | ISound[] {
    return this.getGroups(groupName).getSounds(names as string);
  }

  public removeSound(name: string, groupName: string = 'default') {
    return this.removeSounds(name, groupName);
  }

  public removeSounds(name: string, groupName?: string): IManager;
  public removeSounds(names: string[], groupName?: string): IManager;
  public removeSounds(names: string | string[], groupName: string = 'default'): IManager {
    this.getGroups(groupName).removeSounds(names as string);
    return this;
  }

  public removeAllSounds(groupName?: string) {
    const oneOrMany = nameOrAllKeys(groupName, this.groups);
    doToOneOrMany(this.groups, oneOrMany, 'removeAllSounds');

    return this;
  }

  public playSounds(name: string, groupName?: string): Promise<Event>;
  public playSounds(names: string[], groupName?: string): Promise<Event[]>;
  public playSounds(names: string | string[], groupName: string = 'default'): Promise<Event> | Promise<Event[]> {
    return this.getGroups(groupName).playSounds(names as string);
  }

  public playAllSounds(groupName?: string): Promise<Event[]> {
    if (groupName) {
      return this.getGroups(groupName).playAllSounds();
    } else {
      return new Promise((resolve) => {
        Promise.all(
          this.getGroups(Object.keys(this.groups)).map((group) => (
            group.playAllSounds()
          ))
        ).then((value) => {
          /* Flatten event response arrays. */
          const val = value.reduce((prev, curr) => prev.concat(curr));
          return resolve(val);
        });
      });
    }
  }

  public pauseSounds(name: string, groupName?: string): IManager;
  public pauseSounds(names: string[], groupName?: string): IManager;
  public pauseSounds(names: string | string[], groupName: string = 'default'): IManager {
    this.getGroups(groupName).pauseSounds(names as string);
    return this;
  }

  public pauseAllSounds(groupName?: string) {
    const oneOrMany = nameOrAllKeys(groupName, this.groups);
    doToOneOrMany(this.groups, oneOrMany, 'pauseAllSounds');

    return this;
  }

  public stopSounds(name: string, groupName?: string): IManager;
  public stopSounds(names: string[]): IManager;
  public stopSounds(names: string | string[], groupName: string = 'default'): IManager {
    this.getGroups(groupName).stopSounds(names as string);
    return this;
  }

  public stopAllSounds(groupName?: string) {
    const oneOrMany = nameOrAllKeys(groupName, this.groups);
    doToOneOrMany(this.groups, oneOrMany, 'stopAllSounds');

    return this;
  }

  public getSoundVolume(name: string, groupName: string = 'default') {
    return this.getGroups(groupName).getSounds(name).getVolume();
  }

  public setSoundVolume(name: string, value: number, groupName: string = 'default') {
    this.getGroups(groupName).getSounds(name).setVolume(value);
    return this;
  }

  public updateAllAudioElementsVolume() {
    doToOneOrMany(
      this.groups,
      Object.keys(this.groups),
      'updateAllAudioElementsVolume',
    );

    return this;
  }

  public generateAudioPanelElement(): HTMLElement {
    this.__audioPanelElement = generateAudioPanelElement(this);
    return this.__audioPanelElement;
  }

  public updateAudioPanelElement() {
    assert(this.__audioPanelElement);
    const newElem = updateAudioPanelElement(this, this.__audioPanelElement!);
    this.__audioPanelElement = newElem;

    return this;
  }

  public updatePanelRegistration(sound: ISound, value: boolean): IManager;
  public updatePanelRegistration(group: IGroup, value: boolean): IManager;
  public updatePanelRegistration(soundOrGroup: ISound | IGroup, value: boolean): IManager {
    assert(typeof value === 'boolean');
    soundOrGroup.__panelRegistered = true;
    if (this.__audioPanelElement) {
      this.updateAudioPanelElement();
    }

    return this;
  }
}
