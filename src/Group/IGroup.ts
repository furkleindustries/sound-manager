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
  addSound(name: string, sound: ISound): IGroup;
  addSounds(sounds: ISoundsMap): IGroup;
  removeSound(name: string): IGroup;
  removeSounds(names: string | string[]): IGroup;
  removeAllSounds(): IGroup;
  playSound(name: string): Promise<Event>;
  playSounds(names: string | string[]): Promise<Event[]>;
  playAllSounds(): Promise<Event[]>;
  pauseSound(name: string): IGroup;
  pauseSounds(names: string | string[]): IGroup;
  pauseAllSounds(): IGroup;
  stopSound(name: string): IGroup;
  stopSounds(names: string | string[]): IGroup;
  stopAllSounds(): IGroup;
  updateAllAudioElementsVolume(): IGroup;
}
