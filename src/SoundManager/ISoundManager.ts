import {
  IAnalysableNode,
} from '../interfaces/IAnalysableNode';
import {
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
import {
  IGroup,
} from '../Group/IGroup';
import {
  IGroupOptions,
} from '../Group/IGroupOptions';
import {
  IGroupsMap,
} from './IGroupsMap';
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
  IWebAudioNode,
} from '../interfaces/IWebAudioNode';

export interface ISoundManager extends IWebAudioNode, IAnalysableNode {
  readonly groups: IGroupsMap;
  readonly playlists: IPlaylistsMap;
  getAudioContext(): AudioContext;
  createGroup(options?: IGroupOptions): IGroup;
  addGroup(name: string, options?: IGroupOptions): IGroup;
  addGroups(groups: IGroupsMap): ISoundManager;
  getGroup(name: string): IGroup;
  removeGroup(name: string): ISoundManager;
  removeGroups(names: string | string[]): ISoundManager;
  removeAllGroups(): ISoundManager;
  getGroupVolume(name?: string): number;
  setGroupVolume(value: number, groupName?: string): ISoundManager;
  createPlaylist(options: IPlaylistOptions): IPlaylist;
  addPlaylist(name: string, options: IPlaylistOptions): IPlaylist;
  addPlaylists(playlists: IPlaylistsMap): ISoundManager;
  getPlaylist(name: string): IPlaylist;
  removePlaylist(name: string): ISoundManager;
  removePlaylists(names: string | string[]): ISoundManager;
  removeAllPlaylists(): ISoundManager;
  playPlaylist(name: string): ISoundManager;
  playPlaylists(names: string | string[]): ISoundManager;
  stopPlaylist(name: string): ISoundManager;
  stopPlaylists(names: string | string[]): ISoundManager;
  createSound(options: ICreateSoundOptions): Promise<ISound>;
  addSound(name: string, options: ICreateSoundOptions, groupName?: string): Promise<ISound>;
  addSounds(sounds: ISoundsMap, groupName?: string): ISoundManager;
  getSound(name: string, groupName?: string): ISound;
  removeSound(name: string, groupName?: string): ISoundManager;
  removeSounds(names: string | string[], groupName?: string): ISoundManager;
  removeAllSounds(groupName?: string): ISoundManager;
  playSound(name: string, groupName?: string): ISoundManager;
  playSounds(names: string | string[], groupName?: string): ISoundManager;
  playAllSounds(groupName?: string): ISoundManager;
  pauseSound(name: string, groupName?: string): ISoundManager;
  pauseSounds(names: string | string[], groupName?: string): ISoundManager;
  pauseAllSounds(groupName?: string): ISoundManager;
  stopSound(name: string, groupName?: string): ISoundManager;
  stopSounds(names: string | string[], groupName?: string): ISoundManager;
  stopAllSounds(groupName?: string): ISoundManager;
  getSoundVolume(name: string, groupName?: string): number;
  setSoundVolume(name: string, value: number, groupName?: string): ISoundManager;
  updateAllAudioElementsVolume(): ISoundManager;
  generateAudioPanelElement(): HTMLElement;
  updateAudioPanelElement(): ISoundManager;
  panelRegister(soundOrGroup: ISound | IGroup): ISoundManager;
  panelDeregister(soundOrGroup: ISound | IGroup): ISoundManager;
}
