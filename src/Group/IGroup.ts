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
  getSound(name: string): ISound | null;
  addSounds(sounds: ISoundsMap): IGroup;
  removeSounds(names: string | string[]): IGroup;
  clearAllSounds(): IGroup;
  setVolume(value: number): IGroup;
}
