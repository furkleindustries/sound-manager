import {
  ISoundManager,
} from './ISoundManager';
import {
  IGroupsMap,
} from './IGroupsMap';
import {
  ISoundManagerOptions,
} from './ISoundManagerOptions';
import {
  ISoundsMap,
} from '../Group/ISoundsMap';
import { Group } from '../Group/Group';

export class SoundManager implements ISoundManager {
  private __groups: IGroupsMap = Object.freeze({});
  get groups() {
    return this.__groups;
  }

  private __audioContext: AudioContext;
  get audioContext() {
    return this.__audioContext;
  }

  get inputNode() {
    return this.gainNode;
  }

  get outputNode() {
    return this.analyserNode;
  }

  private __analyserNode: AnalyserNode;
  get analyserNode() {
    return this.__analyserNode;
  }

  private __gainNode: GainNode;
  get gainNode() {
    return this.__gainNode;
  }

  get masterVolume() {
    return this.gainNode.gain.value;
  }

  constructor(options: ISoundManagerOptions) {
    const opts = options || {};
    const {
      groups,
      context,
      masterVolume,
    } = opts;

    if (context) {
      this.__audioContext = context;
    } else {
      this.__audioContext = new (
        AudioContext ||
        // @ts-ignore
        webkitAudioContext
      )();
    }

    this.__analyserNode = this.audioContext.createAnalyser();
    this.__gainNode = this.audioContext.createGain();

    this.inputNode.connect(this.outputNode);
    this.outputNode.connect(this.audioContext.destination);

    if (groups) {
      this.__groups = Object.freeze(Object.assign({}, groups));
      Object.keys(this.groups).forEach((groupName) => {
        const group = this.groups[groupName];
        group.outputNode.connect(this.inputNode);
      });
    }

    if (typeof masterVolume !== 'undefined') {
      this.setMasterVolume(masterVolume);
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

    names.forEach((groupName) => {
      const group = groups[groupName];
      group.outputNode.connect(this.inputNode);
    });

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
      group.outputNode.disconnect();
      delete groups[groupName];
      this.__groups = Object.freeze(groups);
    };

    if (typeof names === 'string') {
      remove(names);
    } else {
      names.forEach(remove);
    }

    if (!('default' in this.groups)) {
      this.addGroups({
        default: new Group({ context: this.audioContext, }),
      });
    }

    return this;
  }

  removeAllGroups() {
    return this.removeGroups(Object.keys(this.groups));
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

  setMasterVolume(value: number) {
    this.gainNode.gain.setValueAtTime(value, this.audioContext.currentTime);
    return this;
  }

  getGroupVolume(name: string = 'default') {
    if (!(name in this.groups)) {
      throw new Error();
    }

    return this.groups[name].volume;
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
