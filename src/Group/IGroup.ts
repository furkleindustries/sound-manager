import {
  IAnalysableNode,
} from '../interfaces/IAnalysableNode';
import {
  IPanelRegisterableNode,
} from '../interfaces/IPanelRegisterableNode';
import {
  ISound,
} from '../Sound/ISound';
import {
  ISoundsMap,
} from './ISoundsMap';
import {
  IWebAudioNode,
} from '../interfaces/IWebAudioNode';

export interface IGroup extends IWebAudioNode, IAnalysableNode, IPanelRegisterableNode {
  readonly sounds: ISoundsMap;
  getContextCurrentTime(): number;
  getSound(name: string): ISound;
  addSounds(sounds: ISoundsMap): IGroup;
  removeSounds(names: string | string[]): IGroup;
  removeAllSounds(): IGroup;
  playSounds(names: string | string[]): IGroup;
  playAllSounds(): IGroup;
  pauseSounds(names: string | string[]): IGroup;
  pauseAllSounds(): IGroup;
  stopSounds(names: string | string[]): IGroup;
  stopAllSounds(): IGroup;
  updateAllAudioElementsVolume(): IGroup;
}
