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
  getAllSounds(): ISound[];
  addSound(name: string, sound: ISound): this;
  addSounds(sounds: ISoundsMap): this;
  removeSounds(names: string): this;
  removeSounds(names: string[]): this;
  removeAllSounds(): this;
  playSounds(name: string): Promise<Event>;
  playSounds(names: string[]): Promise<Event[]>;
  playAllSounds(): Promise<Event[]>;
  pauseSounds(name: string): this;
  pauseSounds(names: string[]): this;
  pauseAllSounds(): this;
  stopSounds(name: string): this;
  stopSounds(names: string[]): this;
  stopAllSounds(): this;
  updateAllAudioElementsVolume(): this;
}
