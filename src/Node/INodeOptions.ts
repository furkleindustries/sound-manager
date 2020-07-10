import {
  ISoundLabel,
} from './ISoundLabel';

export interface INodeOptions {
  context?: AudioContext;
  label?: ISoundLabel;
  isWebAudio?: boolean;
  volume?: number;
}
