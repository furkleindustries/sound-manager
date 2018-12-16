import {
  IGroup,
} from './IGroup';
import {
  IGroupOptions,
} from './IGroupOptions';
import {
  ISoundsMap,
} from './ISoundsMap';

export class Group implements IGroup {
  private __sounds: ISoundsMap = Object.freeze({});
  get sounds() {
    return this.__sounds;
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

  get volume() {
    return this.gainNode.gain.value;
  }

  constructor(options: IGroupOptions) {
    const opts = options || {}

    const {
      context,
      sounds,
      volume,
    } = opts;

    this.__gainNode = context.createGain();
    this.__analyserNode = context.createAnalyser();
    this.gainNode.connect(this.analyserNode);

    if (sounds && typeof sounds === 'object') {
      this.addSounds(sounds);
    }

    if (typeof volume !== 'undefined' && volume >= 0 && volume <= 1) {
      this.setVolume(volume);
    }
  }

  getSound(name: string) {
    return this.sounds[name] || null;
  }

  addSounds(sounds: ISoundsMap) {
    const names = Object.keys(sounds);
    names.forEach((soundName) => {
      if (soundName in this.sounds) {
        throw new Error();
      }
    });

    names.forEach((soundName) => {
      const sound = sounds[soundName];
      sound.gainNode.connect(this.gainNode);
    });

    this.__sounds = Object.freeze(Object.assign(
      {},
      this.sounds,
      sounds,
    ));

    return this;
  }

  removeSounds(names: string | string[]) {
    const remove = (soundName: string) => {
      const sounds = Object.assign(this.sounds);
      const sound = sounds[soundName];
      sound.gainNode.disconnect();
      delete sounds[soundName];
      this.__sounds = Object.freeze(sounds);
    };

    if (typeof names === 'string') {
      remove(names);
    } else {
      names.forEach(remove);
    }

    return this;
  }

  clearAllSounds() {
    Object.keys(this.sounds).forEach((key) => {
      const sound = this.sounds[key];
      sound.gainNode.disconnect();
    });

    this.__sounds = Object.freeze({});
    return this;
  }

  setVolume(value: number) {
    this.gainNode.gain.value = value;
    return this;
  }
}
