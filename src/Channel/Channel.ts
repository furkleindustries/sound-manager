import {
  IChannel,
} from './IChannel';
import {
  IChannelOptions,
} from './IChannelOptions';
import {
  IChannelSoundsMap,
} from './IChannelSoundsMap';
import {
  ISound,
} from '../Sound/ISound';

export class Channel implements IChannel {
  private __sounds: IChannelSoundsMap = Object.freeze({});
  get sounds() {
    return this.__sounds;
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

  constructor(options: IChannelOptions) {
    const opts = options || {}

    const {
      context,
      sounds,
      volume,
    } = opts;

    this.__gainNode = context.createGain();
    this.__analyserNode = context.createAnalyser();
    this.gainNode.connect(this.analyserNode);

    if (Array.isArray(sounds)) {
      this.__sounds = Object.freeze<IChannelSoundsMap>(Object.assign({}, sounds));
      /* Connect all initial sounds' gain nodes to the channel gain node. */
      Object.keys(this.__sounds).forEach((key) => {
        this.__sounds[key].gainNode.connect(this.gainNode);
      });
    }

    if (typeof volume !== 'undefined' && volume >= 0 && volume <= 1) {
      this.setVolume(volume);
    }
  }

  getSound(name: string) {
    return this.sounds[name] || null;
  }

  addSound(name: string, sound: ISound) {
    if (name in this.sounds) {
      throw new Error();
    }

    sound.gainNode.connect(this.gainNode);

    this.__sounds = Object.freeze(Object.assign({}, this.sounds, {
      [name]: sound,
    }));

    return this;
  }

  removeSound(name: string) {
    const sounds = Object.assign({}, this.sounds);
    const sound = sounds[name];
    if (sound) {
      sound.gainNode.disconnect();
    }

    delete (sounds as any)[name];
    this.__sounds = Object.freeze(sounds);
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
