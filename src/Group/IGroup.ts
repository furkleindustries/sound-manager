import {
  IAudioInputOutputNode,
} from '../interfaces/IAudioInputOutputNode';
import {
  ISoundsMap,
} from './ISoundsMap';
import {
  ISound,
} from '../Sound/ISound';

export interface IGroup extends IAudioInputOutputNode {
  readonly sounds: ISoundsMap;
  readonly analyserNode: AnalyserNode;
  readonly gainNode: GainNode;
  readonly volume: number;
  getContextCurrentTime: () => number;
  getSound(name: string): ISound | null;
  addSounds(sounds: ISoundsMap): IGroup;
  removeSounds(names: string | string[]): IGroup;
  clearAllSounds(): IGroup;
  playSounds(names: string | string[]): IGroup;
  playAllSounds(): IGroup;
  pauseSounds(names: string | string[]): IGroup;
  pauseAllSounds(): IGroup;
  stopSounds(names: string | string[]): IGroup;
  stopAllSounds(): IGroup;
  setVolume(value: number): IGroup;
}
