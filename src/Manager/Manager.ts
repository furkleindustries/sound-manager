import {
  AnalysableNodeMixin,
} from '../Node/AnalysableNodeMixin';
import {
  assert,
} from '../assertions/assert';
import {
  assertNodeIsWebAudio,
} from '../assertions/assertNodeIsWebAudio';
import {
  createSound,
} from '../Sound/createSound';
import {
  doToOneOrMany,
} from '../functions/doToOneOrMany';
import {
  generateAudioPanelElement,
} from '../functions/generateAudioPanelElement';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  getPlaylistMessage,
} from './getPlaylistMessage';
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
  ManagerNode,
} from '../Node/ManagerNode';
import {
  nameOrAllKeys,
} from '../functions/nameOrAllKeys';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  Playlist,
} from '../Playlist/Playlist';
import {
  shallowFlattenArray,
} from '../functions/shallowFlattenArray';
import {
  shouldLoopPlaylist,
} from './shouldLoopPlaylist';
import {
  updateAudioPanelElement,
} from '../functions/updateAudioPanelElement';

declare const webkitAudioContext: AudioContext;
const ctxCtor = AudioContext || webkitAudioContext;

export class Manager extends AnalysableNodeMixin(ManagerNode) implements IManager {
  get type() {
    return NodeTypes.Manager;
  }

  private __groups: IGroupsMap = getFrozenObject();
  get groups() {
    return this.__groups;
  }

  private __playlists: IPlaylistsMap = getFrozenObject();
  get playlists() {
    return this.__playlists;
  }

  private __submanagers: ISubmanagerMap = getFrozenObject();
  get submanagers() {
    return this.__submanagers;
  }

  private __audioPanelElement: HTMLElement | null = null;

  constructor(options?: IManagerOptions) {
    super({ ...options });

    if (!this.__audioContext && ctxCtor) {
      this.__audioContext = new ctxCtor();
      this.__isWebAudio = true;
    }

    const opts = options || {};
    const {
      groups,
      masterVolume,
    } = opts;

    if (this.isWebAudio()) {
      this.__connectNodes();
    }

    this.__initializeGroups(groups);

    if (typeof masterVolume !== 'undefined') {
      this.setVolume(masterVolume);
    }
  }

  private __connectNodes() {
    assertNodeIsWebAudio(this, '__connectNodes' as any);
    this.getInputNode().connect(this.getOutputNode());
    this.getOutputNode().connect(this.getAudioContext().destination);
  }

  private __initializeGroups(groups?: IGroupsMap) {
    /* Add the 'default' group. */
    this.__initializeDefaultGroup();

    if (groups) {
      this.__groups = getFrozenObject(this.__groups, groups);
      if (this.isWebAudio()) {
        this.__connectGroupNodes();
      }
    }
  }

  private __initializeDefaultGroup() {
    if (this.isWebAudio()) {
      this.addGroup('default', { context: this.getAudioContext(), });
    } else {
      this.addGroup('default');
    }
  }

  private __connectGroupNodes() {
    assertNodeIsWebAudio(this, '__connectGroupNodes' as any);
    this.getGroups(Object.keys(this.groups)).forEach((group) => (
      group.getOutputNode().connect(this.getInputNode())
    ));
  }

  public setVolume(value: number) {
    super.setVolume(value);
    this.updateAllAudioElementsVolume();

    return this;
  }

  public createGroup(options?: IGroupOptions) {
    const opts = options || {};
    if (this.isWebAudio()) {
      opts.context = this.getAudioContext();
    }

    return new Group(getFrozenObject(opts));
  }

  public addGroup(name: string, options?: IGroupOptions) {
    const group = this.createGroup(options);
    this.addGroups({ [name]: group, });

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

    this.__groups = getFrozenObject(this.groups, groups);

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
    const arr: string[] = typeof names === 'string' ? [ names, ] : names;
    const groups = { ...this.groups, };
    arr.forEach((groupName) => {
      const group = groups[groupName];
      if (group.isWebAudio()) {
        group.getOutputNode().disconnect();
      }

      delete groups[groupName];
    });

    this.__groups = getFrozenObject(groups);
    if (!('default' in this.groups)) {
      /* Re-add a (now-empty) default group. */
      this.__initializeDefaultGroup();
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
      Promise.all(arr.map((name) => this.getGroups(name).playAllSounds()))
        .then((val) => resolve(shallowFlattenArray(val)))
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
    this.__playlists = getFrozenObject(this.playlists, playls);

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
      names.forEach((name) => delete playls[name]);
    }

    this.__playlists = getFrozenObject(playls);

    return this;
  }

  public removeAllPlaylists() {
    return this.removePlaylists(Object.keys(this.playlists));
  }

  public async playPlaylist(name: string) {
    const playlist = this.getPlaylists(name);
    console.log(`Playing playlist ${name}.`);
    const events: Event[] = [];
    let playIndex = 0;
    let loopedTimes = 0;
    let sentinel = true;
    while (sentinel) {
      const id = playlist.ids[playIndex];
      console.log(`${id.groupName}.${id.soundName} starting.`);
      const result = await this.__playPlaylist(
        playlist,
        events,
        playIndex,
        loopedTimes,
      );

      console.log(`${id.groupName}.${id.soundName} ending.`);

      playIndex += 1;
      if (result.looped) {
        console.log(`Looping playlist ${name}.`);
        playIndex = 0;
        loopedTimes += 1;
      }

      sentinel = result.ended;
    }
  }

  private async __playPlaylist(
    playlist: IPlaylist,
    events: Event[],
    playIndex: number,
    loopedTimes: number,
  )
  {
    const id = playlist.ids[playIndex];
    const sound = this.getSounds(id.soundName, id.groupName);

    const event = await sound.play(
      /* Overrides the sound's fade with the playlist fade. This argument is
       * ignored if it's falsy. */
      playlist.fade,
    );

    events.push(event);

    if (playIndex === playlist.ids.length - 1) {
      /* Pass the events to the playlist's callback, if it exists. */
      playlist.tryCallback(events);
      /* Empty the list. */
      events.forEach(events.pop);

      if (shouldLoopPlaylist(playlist, loopedTimes)) {
        /* This value is incremented when the loop begins a new iteration so
         * it must be -1 rather than 0. */
        return getPlaylistMessage(/* ended */ false, /* looped */ true);
      }

      return getPlaylistMessage(/* ended */ true, /* looped */ false);
    }

    return getPlaylistMessage(/* ended */ false, /* looped */ false);
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
        ).then((value) => resolve(shallowFlattenArray(value)));
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
