import {
  IAnalysableNode,
} from '../interfaces/IAnalysableNode';
import {
  ISound,
} from '../Sound/ISound';
import {
  ISoundsMap,
} from './ISoundsMap';
import {
  IWebAudioNode,
} from '../interfaces/IWebAudioNode';

export interface IGroup extends IWebAudioNode, IAnalysableNode {
  readonly sounds: ISoundsMap;
  getContextCurrentTime(): number;
  getSound(name: string): ISound | null;
  addSounds(sounds: ISoundsMap): IGroup;
  removeSounds(names: string | string[]): IGroup;
  removeAllSounds(): IGroup;
  playSounds(names: string | string[]): IGroup;
  playAllSounds(): IGroup;
  pauseSounds(names: string | string[]): IGroup;
  pauseAllSounds(): IGroup;
  stopSounds(names: string | string[]): IGroup;
  stopAllSounds(): IGroup;
}
