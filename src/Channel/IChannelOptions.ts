import {
  IChannelSoundsMap,
} from './IChannelSoundsMap';

export interface IChannelOptions {
  context: AudioContext;
  sounds?: IChannelSoundsMap;
  volume?: number;
}
