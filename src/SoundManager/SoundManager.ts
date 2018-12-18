import {
  createSoundObject,
} from '../functions/createSoundObject';
import {
  Group,
} from '../Group/Group';
import {
  IGroupsMap,
} from './IGroupsMap';
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
  ISoundOptions,
} from '../Sound/ISoundOptions';
import { IGroupOptions } from '../Group/IGroupOptions';

export class SoundManager implements ISoundManager {
  private __groups: IGroupsMap = Object.freeze({});
  get groups() {
    return this.__groups;
  }
 
  public isWebAudio: () => boolean;

  public getAudioContext: () => AudioContext;
  public getInputNode: () => AudioNode;
  public getOutputNode: () => AudioNode;
  public getGainNode: () => GainNode;
  public getAnalyserNode: () => AnalyserNode;
  public getVolume: () => number;
  public setVolume: (value: number) => this;

  constructor(options: ISoundManagerOptions) {
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
      this.getAudioContext = () => new (
        AudioContext ||
        // @ts-ignore
        webkitAudioContext
      )();
    } else {
      this.isWebAudio = () => false;
      this.getAudioContext = () => {
        throw new Error();
      };
    }

    if (this.isWebAudio()) {
      let analyserNode = this.getAudioContext().createAnalyser();
      this.getAnalyserNode = () => analyserNode;
      let gainNode = this.getAudioContext().createGain();
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

        return this;
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
        return this;
      };
    }

    if (groups) {
      this.__groups = Object.freeze(Object.assign({}, groups));
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

  createGroup(options: Partial<IGroupOptions>) {
    if (this.isWebAudio()) {
      return new Group(Object.assign({}, options, {
        context: this.getAudioContext(),
      }));
    } else {
      return new Group(Object.assign({}, options));
    }
  }

  getGroup(name: string) {
    return this.groups[name] || null;
  }

  addGroups(groups: IGroupsMap) {
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
          group.getOutputNode().connect(this.getInputNode());
        }
      });
    }

    this.__groups = Object.freeze(Object.assign(
      {},
      this.groups,
      groups,
    ));

    return this;
  }

  removeGroups(names: string | string[]) {
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
      if (this.isWebAudio()) {
        this.addGroups({
          default: new Group({ context: this.getAudioContext(), }),
        });
      } else {
        this.addGroups({
          default: this.createGroup('default'),
        });
      }
    }

    return this;
  }

  removeAllGroups() {
    return this.removeGroups(Object.keys(this.groups));
  }

  createSound(url: string, options?: Partial<ISoundOptions>) {
    if (this.isWebAudio()) {
      return createSoundObject(url, Object.assign({}, options, {
        context: this.getAudioContext(),
      } as ISoundOptions));
    } else {
      return createSoundObject(url, Object.assign({}, options));
    }
  }

  getSound(name: string, groupName: string = 'default') {
    if (!(groupName in this.groups)) {
      throw new Error();
    }

    return this.groups[groupName].sounds[name] || null;
  }

  addSounds(sounds: ISoundsMap, groupName: string = 'default') {
    if (!(groupName in this.groups)) {
      throw new Error();
    }

    this.groups[groupName].addSounds(sounds);

    return this;
  }

  removeSounds(names: string | string[], groupName: string = 'default') {
    if (!(groupName in this.groups)) {
      throw new Error();
    }

    this.groups[groupName].removeSounds(names);

    return this;
  }

  removeAllSounds(groupName?: string) {
    if (groupName) {
      if (!(groupName in this.groups)) {
        throw new Error();
      }

      this.groups[groupName].removeAllSounds();
    } else {
      Object.keys(this.groups).forEach((key) => {
        this.groups[key].removeAllSounds();
      });
    }

    return this;
  }

  playSounds(names: string | string[], groupName: string = 'default') {
    if (!(groupName in this.groups)) {
      throw new Error();
    }

    this.groups[groupName].playSounds(names);

    return this;
  }

  playAllSounds(groupName?: string) {
    if (groupName) {
      if (!(groupName in this.groups)) {
        throw new Error();
      }

      this.groups[groupName].playAllSounds();
    } else {
      Object.keys(this.groups).forEach((groupName) => {
        this.groups[groupName].playAllSounds();
      });
    }

    return this;
  }

  pauseSounds(names: string | string[], groupName: string = 'default') {
    if (!(groupName in this.groups)) {
      throw new Error();
    }

    this.groups[groupName].pauseSounds(names);

    return this;
  }

  pauseAllSounds(groupName?: string) {
    if (groupName) {
      if (!(groupName in this.groups)) {
        throw new Error();
      }

      this.groups[groupName].pauseAllSounds();
    } else {
      Object.keys(this.groups).forEach((groupName) => {
        this.groups[groupName].pauseAllSounds();
      });
    }

    return this;
  }

  stopSounds(names: string | string[], groupName: string = 'default') {
    if (!(groupName in this.groups)) {
      throw new Error();
    }

    this.groups[groupName].stopSounds(names);

    return this;
  }

  stopAllSounds(groupName?: string) {
    if (groupName) {
      if (!(groupName in this.groups)) {
        throw new Error();
      }

      this.groups[groupName].stopAllSounds();
    } else {
      Object.keys(this.groups).forEach((groupName) => {
        this.groups[groupName].stopAllSounds();
      });
    }

    return this;
  }

  getGroupVolume(name: string = 'default') {
    if (!(name in this.groups)) {
      throw new Error();
    }

    return this.groups[name].getVolume();
  }

  setGroupVolume(value: number, groupName: string = 'default'): ISoundManager {
    if (!(groupName in this.groups)) {
      throw new Error();
    }

    this.groups[groupName].setVolume(value);

    return this;
  }

  getSoundVolume(name: string, groupName: string = 'default') {
    if (!(groupName in this.groups)) {
      throw new Error();
    }

    const group = this.groups[groupName];
    if (!(name in group.sounds)) {
      throw new Error();
    }

    return group.sounds[name].volume;
  }

  setSoundVolume(name: string, value: number, groupName: string = 'default') {
    if (!(groupName in this.groups)) {
      throw new Error();
    }

    const group = this.groups[groupName];
    if (!(name in group.sounds)) {
      throw new Error();
    }

    group.sounds[name].setVolume(value);

    return this;
  }
}
