import {
  IAnalysableNode,
} from '../Node/IAnalysableNode';
import {
  IPanelRegisterableNode,
} from '../Node/IPanelRegisterableNode';
import {
  ISound,
} from '../Sound/ISound';
import {
  ISoundsMap,
} from './ISoundsMap';
import {
  IManagerNode,
} from '../Node/IManagerNode';

export interface IGroup extends IManagerNode, IAnalysableNode, IPanelRegisterableNode {
  readonly sounds: ISoundsMap;
  getContextCurrentTime(): number;
  getSounds(name: string): ISound;
  getSounds(names: string[]): ISound[];
  addSound(name: string, sound: ISound): IGroup;
  addSounds(sounds: ISoundsMap): IGroup;
  removeSounds(names: string): IGroup;
  removeSounds(names: string[]): IGroup;
  removeAllSounds(): IGroup;
  playSounds(name: string): Promise<Event>;
  playSounds(names: string[]): Promise<Event[]>;
  playAllSounds(): Promise<Event[]>;
  pauseSounds(name: string): IGroup;
  pauseSounds(names: string[]): IGroup;
  pauseAllSounds(): IGroup;
  stopSounds(name: string): IGroup;
  stopSounds(names: string[]): IGroup;
  stopAllSounds(): IGroup;
  updateAllAudioElementsVolume(): IGroup;
}
