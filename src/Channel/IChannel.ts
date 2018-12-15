import {
  IChannelSoundsMap,
} from './IChannelSoundsMap';
import {
  ISound,
} from '../Sound/ISound';

export interface IChannel {
  readonly sounds: IChannelSoundsMap;
  readonly analyserNode: AnalyserNode;
  readonly gainNode: GainNode;
  readonly volume: number;
  getSound(name: string): ISound | null;
  addSound(name: string, sound: ISound): IChannel;
  removeSound(name: string): IChannel;
  clearAllSounds(): IChannel;
  setVolume(value: number): IChannel;
}
