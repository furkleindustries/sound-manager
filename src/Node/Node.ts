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
  INode,
} from './INode';
import {
  INodeOptions,
} from './INodeOptions';
import {
  isValidVolume,
} from '../functions/isValidVolume';

export class ManagerNode implements INode {
  get type(): NodeTypes {
    throw new Error('Type not implemented.');
  }

  private __volume: number = 1;
  private __gainNode: GainNode | null = null;

  protected __isWebAudio: boolean;
  protected __audioContext: AudioContext | null = null;

  constructor(options?: INodeOptions) {
    const opts = options || {};
    const {
      context,
      volume,
    } = opts;

    this.__audioContext = context || null;
    this.__isWebAudio = Boolean(this.__audioContext);
    if (this.isWebAudio()) {
      this.__gainNode = this.getAudioContext().createGain();
    }

    if (isValidVolume(volume)) {
      this.setVolume(volume);
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
    assertValid(value, '', isValidVolume);
    this.__volume = value;
    if (this.isWebAudio()) {
      const currentTime = this.getContextCurrentTime();
      this.getGainNode().gain.setValueAtTime(value, currentTime);
    }

    return this;
  }
}
