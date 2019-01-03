import {
  NodeTypes,
} from '../enums/NodeTypes';

export interface IManagerNode {
  readonly type: NodeTypes;
  isWebAudio(): boolean;
  getAudioContext(): AudioContext;
  getContextCurrentTime(): number;
  getGainNode(): GainNode;
  getInputNode(): AudioNode;
  getVolume(): number;
  setVolume(value: number): IManagerNode;
}
