import {
  Channel,
} from '../Channel/Channel';
import {
  IChannel,
} from '../Channel/IChannel';
import {
  ISoundManager,
} from './ISoundManager';
import {
  ISoundManagerChannelsMap,
} from './ISoundManagerChannelsMap';

export class SoundManager implements ISoundManager {
  private __channels: ISoundManagerChannelsMap = Object.freeze({});
  get channels() {
    return this.__channels;
  }

  private __audioContext: AudioContext;
  get audioContext() {
    return this.__audioContext;
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
    const {
      channels,
      context,
      masterVolume,
    } = options;

    if (context) {
      this.__audioContext = context;
    } else {
      this.__audioContext = new AudioContext();
    }

    this.__analyserNode = this.audioContext.createAnalyser();
    this.__gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.analyserNode);
    this.analyserNode.connect(this.audioContext.destination);

    if (channels) {
      this.__channels = Object.freeze(Object.assign({}, channels));
      Object.keys(this.channels).forEach((channelName) => {
        const channel = this.channels[channelName];
        channel.analyserNode.connect(this.gainNode);
      });
    }

    if (typeof masterVolume !== 'undefined' &&
        masterVolume >= 0 &&
        masterVolume <= 1)
    {
      this.setMasterVolume(masterVolume);
    }
  }

  getChannel(name: string) {
    return this.channels[name] || null;
  }

  addChannel(name: string, channel: IChannel) {
    if (name in this.channels) {
      throw new Error();
    }

    channel.analyserNode.connect(this.gainNode);
    this.__channels = Object.freeze(Object.assign({}, this.channels, {
      [name]: channel,
    }));

    return this;
  }
}
