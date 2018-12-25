import {
  NodeTypes,
} from '../enums/NodeTypes';

export interface IAudioNode {
  readonly type: NodeTypes;
  getVolume(): number;
  setVolume(value: number): IAudioNode;
  isWebAudio(): boolean;
}
