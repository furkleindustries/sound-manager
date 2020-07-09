import {
  ISoundLabel,
} from './ISoundLabel';
import {
  NodeTypes,
} from '../enums/NodeTypes';

export interface IBaseNode {
  readonly type: NodeTypes;
  isWebAudio(): boolean;
  getAudioContext(): AudioContext;
  getContextCurrentTime(): number;
  getGainNode(): GainNode;
  getInputNode(): AudioNode;
  getLabel(): ISoundLabel;
  setLabel(label: Partial<ISoundLabel>): IBaseNode;
  getVolume(): number;
  setVolume(value: number): IBaseNode;
}
