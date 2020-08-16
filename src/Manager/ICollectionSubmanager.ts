import {
  ICreateSoundOptions,
} from '../Sound/ICreateSoundOptions';
import {
  IGroup,
} from '../Group/IGroup';
import {
  IGroupsMap,
} from './IGroupsMap';
import {
  IGroupOptions,
} from '../Group/IGroupOptions';
import {
  ISound,
} from '../Sound/ISound';
import {
  ISoundsMap,
} from '../Group/ISoundsMap';

export interface ICollectionSubmanager {
  /* Node collection */
  readonly groups: IGroupsMap;
  addGroup(name: string, options?: IGroupOptions): IGroup;
  addGroups(groups: IGroupsMap): this;
  hasGroup(name: string): boolean;
  getGroup(name: string): IGroup;
  hasGroups(names: string[]): boolean;
  getGroups(names: string[]): IGroup[];
  getGroupsByTag(tag: string): IGroup[];
  getGroupsByTags(tags: string[], matchOneOrAll?: 'one' | 'all'): IGroup[];
  getAllGroups(): IGroup[];
  removeGroup(name: string): this;
  removeGroups(names: string[]): this;
  removeAllGroups(): this;
  getGroupVolume(name?: string): number;
  setGroupVolume(value: number, groupName?: string): this;
  hasIntentToAddSound(name: string, groupName?: string): boolean;
  addSound(
    name: string,
    options: ICreateSoundOptions,
    groupName?: string,
    isPreloading?: boolean,
  ): Promise<ISound>;

  addSounds(sounds: ISoundsMap, groupName?: string): this;
  hasSound(name: string, groupName?: string): boolean;
  getSound(name: string, groupName?: string): ISound;
  hasSounds(names: string[], groupName?: string): boolean;
  getSounds(names: string[], groupName?: string): ISound[];
  getSoundsByTag(tag: string): ISound[];
  getSoundsByTags(tags: string[], matchOneOrAll?: 'one' | 'all'): ISound[];
  getAllSounds(): ISound[];
  removeSound(name: string, groupName?: string): this;
  removeSounds(names: string[], groupName?: string): this;
  removeAllSounds(groupName?: string): this;
  getSoundVolume(name: string, groupName?: string): number;
  setSoundVolume(name: string, value: number, groupName?: string): this;
  updateAllAudioElementsVolume(): this;
}
