import {
  assert,
} from '../assertions/assert';
import {
  assertNodeIsWebAudio,
} from '../assertions/assertNodeIsWebAudio';
import {
  assertValid,
} from '../assertions/assertValid';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  IManagerNode,
} from './IManagerNode';
import {
  IManagerNodeOptions,
} from './IManagerNodeOptions';

export class ManagerNode implements IManagerNode {
  get type(): NodeTypes {
    throw new Error('Type not implemented.');
  }

  private __volume: number = 1;
  protected __audioContext: AudioContext | null = null;
  protected __isWebAudio: boolean;
  protected __gainNode: GainNode | null = null;

  constructor(options?: IManagerNodeOptions) {
    const opts = options || {};
    const {
      context,
    } = opts;

    this.__audioContext = context || null;
    this.__isWebAudio = Boolean(this.__audioContext);
    if (this.isWebAudio()) {
      this.__gainNode = this.getAudioContext().createGain();
    }
  }

  public isWebAudio() {
    return this.__isWebAudio;
  }

  public getAudioContext() {
    assertNodeIsWebAudio(this, 'getAudioContext');
    return assertValid<AudioContext>(this.__audioContext);
  }

  public getContextCurrentTime() {
    return this.getAudioContext().currentTime;
  }

  public getGainNode() {
    assertNodeIsWebAudio(this, 'getGainNode');
    return assertValid<GainNode>(this.__gainNode);
  }

  public getInputNode(): AudioNode {
    return this.getGainNode();
  }

  public getVolume() {
    return this.__volume;
  }

  public setVolume(value: number) {
    assert(value >= 0 && value <= 1);
    this.__volume = value;
    if (this.isWebAudio()) {
      const currentTime = this.getContextCurrentTime();
      this.getGainNode().gain.setValueAtTime(value, currentTime);
    }

    return this;
  }
}
