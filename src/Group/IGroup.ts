import {
  IAnalysableNode,
} from '../Node/IAnalysableNode';
import {
  IBaseNode,
} from '../Node/IBaseNode';
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
  ITaggableNode,
} from '../Node/ITaggableNode';
import {
  NodeTypes,
} from '../enums/NodeTypes';

export interface IGroup
  extends
    IBaseNode,
    IAnalysableNode,
    IPanelRegisterableNode,
    ITaggableNode
{
  readonly type: NodeTypes.Group;
  readonly sounds: ISoundsMap;
  getContextCurrentTime(): number;
  getSound(name: string): ISound;
  getSounds(names: string[]): ISound[];
  getAllSounds(): ISound[];
  getSoundsByTag(tag: string): ISound[];
  getSoundsByTags(tags: string[], matchOneOrAll: 'one' | 'all'): ISound[];
  addSound(name: string, sound: ISound): this;
  addSounds(sounds: ISoundsMap): this;
  removeSound(names: string): this;
  removeSounds(names: string[]): this;
  removeAllSounds(): this;
  playSound(name: string): Promise<Event>;
  playSounds(names: string[]): Promise<Event[]>;
  playAllSounds(): Promise<Event[]>;
  pauseSound(name: string): this;
  pauseSounds(names: string[]): this;
  pauseAllSounds(): this;
  stopSound(name: string): this;
  stopSounds(names: string[]): this;
  stopAllSounds(): this;
  updateAllAudioElementsVolume(): this;
}
