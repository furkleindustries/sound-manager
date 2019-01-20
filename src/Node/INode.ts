import {
  NodeTypes,
} from '../enums/NodeTypes';

export interface INode {
  readonly type: NodeTypes;
  isWebAudio(): boolean;
  getAudioContext(): AudioContext;
  getContextCurrentTime(): number;
  getGainNode(): GainNode;
  getInputNode(): AudioNode;
  getVolume(): number;
  setVolume(value: number): INode;
}
