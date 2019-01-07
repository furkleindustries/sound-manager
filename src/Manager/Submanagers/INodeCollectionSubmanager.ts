import {
  IGroupsMap,
} from '../IGroupsMap';
import { ISoundsMap } from '../../Group/ISoundsMap';
import { ISound } from '../../Sound/ISound';
import { IGroup } from '../../Group/IGroup';
import { IGroupOptions } from '../../Group/IGroupOptions';
import { ICreateSoundOptions } from '../../Sound/ICreateSoundOptions';

export interface INodeCollectionSubmanager {
  readonly groups: IGroupsMap;
  __groups: IGroupsMap;
  addGroup(name: string, options?: IGroupOptions): IGroup;
  addGroups(groups: IGroupsMap): this;
  initializeDefaultGroup(): this;
  getGroups(name: string): IGroup;
  getGroups(names: string[]): IGroup[];
  getAllGroups(): IGroup[];
  removeGroups(name: string): this;
  removeGroups(names: string[]): this;
  removeAllGroups(): this;
  getGroupVolume(name?: string): number;
  setGroupVolume(value: number, groupName?: string): this;
  addSound(
    name: string,
    options: ICreateSoundOptions,
    groupName?: string,
  ): Promise<ISound>;
  addSounds(sounds: ISoundsMap, groupName?: string): this;
  getSounds(name: string, groupName?: string): ISound;
  getSounds(names: string[], groupName?: string): ISound[];
  getAllSounds(): ISound[];
  removeSounds(name: string, groupName?: string): this;
  removeSounds(names: string[], groupName?: string): this;
  removeAllSounds(groupName?: string): this;
  getSoundVolume(name: string, groupName?: string): number;
  setSoundVolume(name: string, value: number, groupName?: string): this;
  updateAllAudioElementsVolume(): this;
}
