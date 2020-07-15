import {
  ISoundLabel,
} from './ISoundLabel';
import {
  NodeTypes,
} from '../enums/NodeTypes';

export interface IBaseNode {
  readonly type: NodeTypes;
  getLabel(): ISoundLabel;
  setLabel(label: Partial<ISoundLabel>): IBaseNode;
  getVolume(): number;
  setVolume(value: number): IBaseNode;
}
