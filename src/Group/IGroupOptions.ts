import {
  ISoundsMap,
} from './ISoundsMap';

export interface IGroupOptions {
  context?: AudioContext;
  sounds?: ISoundsMap;
  volume?: number;
}
