import {
  ISoundLabel,
} from './ISoundLabel';

export interface INodeOptions {
  context?: AudioContext;
  label?: ISoundLabel;
  panelRegistered?: boolean;
  volume?: number;
}
