import {
  IAnalysableNode,
} from '../Node/IAnalysableNode';
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
  IManagerNode,
} from '../Node/IManagerNode';
import {
  IPanelRegisterableNode,
} from '../Node/IPanelRegisterableNode';
import {
  IPlaylist,
} from '../Playlist/IPlaylist';
import {
  IPlaylistOptions,
} from '../Playlist/IPlaylistOptions';
import {
  IPlaylistsMap,
} from './IPlaylistsMap';
import {
  ISound,
} from '../Sound/ISound';
import {
  ISoundsMap,
} from '../Group/ISoundsMap';
import {
  NodeTypes,
} from '../enums/NodeTypes';

export interface IManager extends IManagerNode, IAnalysableNode {
  readonly type: NodeTypes.Manager;

  /* Node collection */
  readonly groups: IGroupsMap;
  addGroup(name: string, options?: IGroupOptions): IGroup;
  addGroups(groups: IGroupsMap): this;
  getGroup(name: string): IGroup;
  getGroups(names: string[]): IGroup[];
  getGroupsByTag(tag: string): IGroup[];
  getGroupsByTags(tags: string[], matchOneOrAll?: 'one' | 'all'): IGroup[];
  getAllGroups(): IGroup[];
  removeGroup(name: string): this;
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
  getSound(name: string, groupName?: string): ISound;
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

  /* Player */
  readonly playlists: IPlaylistsMap;
  playGroup(name: string): Promise<Event[]>;
  playGroups(names: string[]): Promise<Event[]>;
  playSound(name: string, groupName?: string): Promise<Event>;
  playSounds(names: string[], groupName?: string): Promise<Event[]>;
  playAllSounds(groupName?: string): Promise<Event[]>;
  pauseSound(name: string, groupName?: string): this;
  pauseSounds(names: string[], groupName?: string): this;
  pauseAllSounds(groupName?: string): this;
  stopSound(name: string, groupName?: string): this;
  stopSounds(names: string[], groupName?: string): this;
  stopAllSounds(groupName?: string): this;
  addPlaylist(name: string, options: IPlaylistOptions): IPlaylist;
  addPlaylists(playlists: IPlaylistsMap): this;
  getPlaylist(name: string): IPlaylist;
  getPlaylists(names: string[]): IPlaylist[];
  playPlaylist(name: string): Promise<void>;
  playPlaylists(names: string[]): Promise<void>;
  stopPlaylist(name: string): this;
  stopPlaylists(names: string[]): this;

  /* Audio panel */
  generateVolumePanelElement(): HTMLElement;
  updateVolumePanelElement(): this;
  volumePanelRegister(node: IPanelRegisterableNode): this;
  volumePanelDeregister(node: IPanelRegisterableNode): this;
}
