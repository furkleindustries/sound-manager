import {
  IChannel,
} from './IChannel';
import {
  IChannelOptions,
} from './IChannelOptions';
import {
  ISound,
} from '../Sound/ISound';

export class Channel implements IChannel {
  private __sounds: { [key: string]: ISound, } = {};
  get sounds() {
    return this.__sounds;
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

    if (Array.isArray(sounds)) {
      this.__sounds = Object.assign({}, sounds);
      /* Connect all initial sounds' gain nodes to the channel gain node. */
      Object.keys(this.__sounds).forEach((key) => {
        this.__sounds[key].gainNode.connect(this.gainNode);
      });
    }

    if (typeof volume !== 'undefined' && volume >= 0 && volume <= 1) {
      this.__gainNode.gain.value = volume;
    }
  }
}
