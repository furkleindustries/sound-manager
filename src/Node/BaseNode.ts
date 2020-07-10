import {
  assertNodeIsWebAudio,
} from '../assertions/assertNodeIsWebAudio';
import {
  IBaseNode,
} from './IBaseNode';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  INodeOptions,
} from './INodeOptions';
import {
  ISoundLabel,
} from './ISoundLabel';
import {
  isValidVolume,
} from '../functions/isValidVolume';
import {
  assertValid,
} from 'ts-assertions';

export class BaseNode implements IBaseNode {
  get type(): NodeTypes {
    throw new Error('Type not implemented.');
  }

  protected __audioContext: AudioContext | null = null;
  protected __gainNode: GainNode | null = null;
  protected __isWebAudio: boolean;
  protected __label: ISoundLabel = {
    artistName: '',
    contributors: [],
    license: '',
    title: '',
  };

  protected __volume: number = 1;

  constructor(options?: INodeOptions) {
    const opts = options || {};
    const {
      context,
      isWebAudio,
      label,
      volume,
    } = opts;

    this.__audioContext = context || null;
    this.__isWebAudio = Boolean(isWebAudio || this.__audioContext);
    if (this.isWebAudio()) {
      this.__gainNode = this.getAudioContext().createGain();
    }

    if (label) {
      this.setLabel(label);
    }

    if (isValidVolume(volume)) {
      this.setVolume(volume);
    }
  }

  public readonly isWebAudio = () => Boolean(this.__isWebAudio);

  public readonly getAudioContext = () => {
    assertNodeIsWebAudio(this, 'getAudioContext');
    return assertValid<AudioContext>(this.__audioContext);
  };

  public readonly getContextCurrentTime = () => (
    this.getAudioContext().currentTime * 1000
  );

  public getGainNode = () => {
    assertNodeIsWebAudio(this, 'getGainNode');
    return assertValid<GainNode>(this.__gainNode);
  };

  public readonly getInputNode = (): AudioNode => this.getGainNode();

  public readonly getLabel = (): ISoundLabel => this.__label;

  public setLabel(label: Partial<ISoundLabel>) {
    const newLabel = { ...this.getLabel() };

    if (label.artistName) {
      newLabel.artistName = label.artistName;
    }

    if (Array.isArray(label.contributors)) {
      newLabel.contributors = label.contributors;
    }

    if (label.license) {
      newLabel.license = label.license;
    }

    if (label.title) {
      newLabel.title = label.title;
    }

    this.__label = { ...newLabel };

    return this;
  };

  public readonly getVolume = () => this.__volume;

  /**
   * TODO: Figure out why this can't be an arrow function.
   * (Probably because it needs to exist on the prototype.)
   */
  public setVolume(value: number) {
    assertValid(value, '', isValidVolume);
    this.__volume = value;
    if (this.isWebAudio()) {
      const currentTime = this.getContextCurrentTime() / 1000;
      this.getGainNode().gain.setValueAtTime(value, currentTime);
    }

    return this;
  }
}
