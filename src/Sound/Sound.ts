import {
  ISound,
} from './ISound';
import {
  ISoundOptions,
} from './ISoundOptions';

export class Sound implements ISound {
  private __sourceNode: AudioBufferSourceNode
  get sourceNode() {
    return this.__sourceNode;
  }

  private __gainNode: GainNode;
  get gainNode() {
    return this.__gainNode;
  }

  get volume() {
    return this.__gainNode.gain.value;
  }

  constructor(options: ISoundOptions) {
    const {
      buffer,
      context,
      volume,
    } = options;

    if (buffer) {
      const sourceNode = context.createBufferSource();
      sourceNode.buffer = buffer;
      this.__sourceNode = sourceNode;
      const gainNode = context.createGain();
      sourceNode.connect(gainNode);
      this.__gainNode = gainNode;
    } else {
      throw new Error();
    }

    if (typeof volume !== 'undefined' && volume >= 0 && volume <= 1) {
      this.gainNode.gain.value = volume;
    }
  }

  getVolume() {
    return this.gainNode.gain.value;
  }

  setVolume(value: number) {
    if (value >= 0 && value <= 1) {
      this.gainNode.gain.value = value;
    } else {
      throw new Error();
    }

    return this;
  }
}
