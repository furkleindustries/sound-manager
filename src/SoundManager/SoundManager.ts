import {
  createSound,
} from '../functions/createSound';
import {
  generateAudioPanelElement,
} from '../functions/generateAudioPanelElement';
import {
  Group,
} from '../Group/Group';
import {
  IGroup,
} from '../Group/IGroup';
import {
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
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
  ISoundManager,
} from './ISoundManager';
import {
  ISoundManagerOptions,
} from './ISoundManagerOptions';
import {
  ISoundsMap,
} from '../Group/ISoundsMap';
import {
  Playlist,
} from '../Playlist/Playlist';
import {
  updateAudioPanelElement,
} from '../functions/updateAudioPanelElement';

export class SoundManager implements ISoundManager {
  private __groups: IGroupsMap = Object.freeze({});
  get groups() {
    return this.__groups;
  }

  private __playlists: IPlaylistsMap = Object.freeze({});
  get playlists() {
    return this.__playlists;
  }

  private __audioPanelElement: HTMLElement | null = null;
 
  public readonly isWebAudio: () => boolean;
  public readonly getAudioContext: () => AudioContext;
  public readonly getInputNode: () => AudioNode;
  public readonly getOutputNode: () => AudioNode;
  public readonly getGainNode: () => GainNode;
  public readonly getAnalyserNode: () => AnalyserNode;
  public readonly getVolume: () => number;
  public readonly setVolume: (value: number) => this;

  constructor(options?: ISoundManagerOptions) {
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
  
      this.getInputNode = () => this.getAnalyserNode();
      this.getOutputNode = () => this.getGainNode();

      this.getInputNode().connect(this.getOutputNode());
      this.getOutputNode().connect(this.getAudioContext().destination);

      this.getVolume = () => this.getGainNode().gain.value;
      this.setVolume = (value: number) => {
        this.getGainNode().gain.setValueAtTime(
          value,
          this.getAudioContext().currentTime,
        );

        return this.updateAllAudioElementsVolume();
      }
    } else {
      this.getAnalyserNode = () => {
        throw new Error();
      };

      this.getGainNode = () => {
        throw new Error();
      };

      this.getInputNode = () => {
        throw new Error();
      };

      this.getOutputNode = () => {
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
    names.forEach((groupName) => {
      if (groupName in this.groups) {
        throw new Error();
      }
    });

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

  public getGroup(name: string) {
    const group = this.groups[name];
    if (!group) {
      throw new Error();
    }

    return group;
  }

  public removeGroup(name: string) {
    return this.removeGroups(name);
  }

  public removeGroups(names: string | string[]) {
    const remove = (groupName: string) => {
      const groups = Object.assign(this.groups);
      const group = groups[groupName];
      if (group.isWebAudio()) {
        group.getOutputNode().disconnect();
      }

      delete groups[groupName];
      this.__groups = Object.freeze(groups);
    };

    if (typeof names === 'string') {
      remove(names);
    } else {
      names.forEach(remove);
    }

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

  public playGroup(name: string) {
    return this.getGroup(name).playAllSounds();
  }

  public playGroups(names: string | string[]): Promise<Event[]> {
    let arr: string[];
    if (typeof names === 'string') {
      arr = [ names, ];
    } else {
      arr = names;
    }

    return new Promise((resolve) => (
      Promise.all(arr.map((name) => {
        const group = this.getGroup(name);
        return group.playAllSounds();
      })).then((val) => (
        resolve(val.reduce((prev, curr) => prev.concat(curr)))
      ))
    ));
  }

  public getGroupVolume(name: string = 'default') {
    return this.getGroup(name).getVolume();
  }

  public setGroupVolume(value: number, groupName: string = 'default') {
    this.getGroup(groupName).setVolume(value);
    return this;
  }

  public createPlaylist(options: IPlaylistOptions) {
    const opts = options || {};
    return new Playlist({ ...opts, });
  }

  public addPlaylist(name: string, options: IPlaylistOptions) {
    const playlist = this.createPlaylist(options);
    this.addPlaylists({
      [name]: playlist,
    });

    return playlist;
  }

  public addPlaylists(playlists: IPlaylistsMap) {
    const playls = playlists || {};

    const names = Object.keys(playls);
    names.forEach((playlistName) => {
      if (playlistName in this.playlists) {
        throw new Error();
      }
    });

    this.__playlists = Object.freeze({
      ...this.playlists,
      ...playls,
    });

    return this;
  }

  public getPlaylist(name: string) {
    const playlist = this.playlists[name];
    if (!playlist) {
      throw new Error();
    }

    return playlist;
  }

  public removePlaylist(name: string) {
    return this.removePlaylists(name);
  }

  public removePlaylists(names: string | string[]) {
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

  public playPlaylist(name: string): Promise<Event> {
    return new Promise((resolve) => {
      this.playPlaylists(name).then((val) => resolve(val[0]));
    });
  }

  public playPlaylists(names: string | string[]): Promise<Event[]> {
    let arr: string[];
    if (typeof names === 'string') {
      arr = [ names, ];
    } else {
      arr = names;
    }

    
    const promises = arr.map((name) => {
      const playlist = this.getPlaylist(name);
      const sounds = playlist.soundGroupIdentifiers.map((id) => (
        this.getSound(id.soundName, id.groupName)
      ));

      let index = -1;
      const events: Event[] = [];
      const play: () => Promise<Event[]> = () => {
        index += 1;
        const sound = sounds[index];
        return new Promise((resolve) => {
          if (index === sounds.length) {
            return resolve(events);
          }
          
          const prom = sound.play();
          prom.then((e) => {
            events.push(e);
            return play();
          });
        });
      };
  
      return play();
    });

    return new Promise((resolve) => (
      Promise.all(promises).then((value) => (
        resolve(value.reduce((prev, curr) => prev.concat(curr)))
      ))
    ));
  }

  public stopPlaylist(name: string) {
    return this.stopPlaylists(name);
  }

  public stopPlaylists(names: string | string[]) {
    const stop = (playlistName: string) => {
      /* TODO: add playlisting logic. */
      playlistName;
    };

    if (typeof names === 'string') {
      stop(names);
    } else {
      names.forEach(stop);
    }

    return this;
  }

  public createSound(options: ICreateSoundOptions): Promise<ISound> {
    const opts = options || {};
    if (this.isWebAudio()) {
      return createSound({
        ...opts,
        context: this.getAudioContext(),
        manager: this,
      });
    } else {
      return createSound({
        ...opts,
        manager: this,
      });
    }
  }

  public addSound(
    name: string,
    options: ICreateSoundOptions,
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
    const group = this.getGroup(groupName);
    group.addSounds(sounds);

    return this;
  }

  public getSound(name: string, groupName: string = 'default') {
    const group = this.getGroup(groupName);
    return group.getSound(name);
  }

  public removeSound(name: string, groupName: string = 'default') {
    return this.removeSounds(name, groupName);
  }

  public removeSounds(names: string | string[], groupName: string = 'default') {
    this.getGroup(groupName).removeSounds(names);
    return this;
  }

  public removeAllSounds(groupName?: string) {
    if (groupName) {
      this.getGroup(groupName).removeAllSounds();
    } else {
      Object.keys(this.groups).forEach((groupName) => {
        this.getGroup(groupName).removeAllSounds();
      });
    }

    return this;
  }

  public playSound(name: string, groupName: string = 'default'): Promise<Event> {
    return new Promise((resolve) => {
      this.playSounds(name, groupName).then((val) => resolve(val[0]));
    });
  }

  public playSounds(names: string | string[], groupName: string = 'default') {
    return this.getGroup(groupName).playSounds(names);
  }

  public playAllSounds(groupName?: string): Promise<Event[]> {
    if (groupName) {
      return this.getGroup(groupName).playAllSounds();
    } else {
      return new Promise((resolve) => {
        Promise.all(
          Object.keys(this.groups).map((groupName) => (
            this.getGroup(groupName).playAllSounds()
          ))
        ).then((value) => {
          /* Flatten event response arrays. */
          const val = value.reduce((prev, curr) => prev.concat(curr));
          return resolve(val);
        });
      });
    }
  }

  public pauseSound(name: string, groupName: string = 'default') {
    return this.pauseSounds(name, groupName);
  }

  public pauseSounds(names: string | string[], groupName: string = 'default') {
    this.getGroup(groupName).pauseSounds(names);
    return this;
  }

  public pauseAllSounds(groupName?: string) {
    if (groupName) {
      this.getGroup(groupName).pauseAllSounds();
    } else {
      Object.keys(this.groups).forEach((groupName) => {
        this.getGroup(groupName).pauseAllSounds();
      });
    }

    return this;
  }

  public stopSound(name: string, groupName: string = 'default') {
    return this.stopSounds(name, groupName);
  }

  public stopSounds(names: string | string[], groupName: string = 'default') {
    this.getGroup(groupName).stopSounds(names);
    return this;
  }

  public stopAllSounds(groupName?: string) {
    if (groupName) {
      this.getGroup(groupName).stopAllSounds();
    } else {
      Object.keys(this.groups).forEach((groupName) => {
        this.getGroup(groupName).stopAllSounds();
      });
    }

    return this;
  }

  public getSoundVolume(name: string, groupName: string = 'default') {
    return this.getGroup(groupName).getSound(name).getVolume();
  }

  public setSoundVolume(name: string, value: number, groupName: string = 'default') {
    this.getGroup(groupName).getSound(name).setVolume(value);
    return this;
  }

  public updateAllAudioElementsVolume() {
    Object.keys(this.groups).forEach((groupName) => {
      this.getGroup(groupName).updateAllAudioElementsVolume();
    });

    return this;
  }

  public generateAudioPanelElement(): HTMLElement {
    this.__audioPanelElement = generateAudioPanelElement(this);
    return this.__audioPanelElement;
  }

  public updateAudioPanelElement() {
    if (!this.__audioPanelElement) {
      throw new Error();
    }

    const newElem = updateAudioPanelElement(this, this.__audioPanelElement);
    this.__audioPanelElement = newElem;

    return this;
  }

  public panelRegister(soundOrGroup: ISound | IGroup) {
    // @ts-ignore
    soundOrGroup.__panelRegistered = true;
    if (this.__audioPanelElement) {
      this.updateAudioPanelElement();
    }

    return this;
  }

  public panelDeregister(soundOrGroup: ISound | IGroup) {
    // @ts-ignore
    soundOrGroup.__panelRegistered = false;
    if (this.__audioPanelElement) {
      this.updateAudioPanelElement();
    }

    return this;
  }
}
