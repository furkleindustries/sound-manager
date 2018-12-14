import {
  ISound,
} from '../Sound/ISound';

export interface IChannelOptions {
  context: AudioContext;
  sounds?: { [key: string]: ISound, };
  volume?: number;
}
