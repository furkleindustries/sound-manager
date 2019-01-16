import {
  ISoundsMap,
} from './ISoundsMap';

export interface IGroupOptions {
  context?: AudioContext;
  sounds?: ISoundsMap;
  tags?: string[];
  volume?: number;
}
