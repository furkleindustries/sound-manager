import {
  IAnalysableNode,
} from '../interfaces/IAnalysableNode';
import {
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
import {
  IFade,
} from '../Fade/IFade';
import {
  IFadeOptions,
} from '../Fade/IFadeOptions';
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

export interface IManager extends IWebAudioNode, IAnalysableNode {
  readonly groups: IGroupsMap;
  readonly playlists: IPlaylistsMap;
  getAudioContext(): AudioContext;
  createGroup(options?: IGroupOptions): IGroup;
  addGroup(name: string, options?: IGroupOptions): IGroup;
  addGroups(groups: IGroupsMap): IManager;
  getGroup(name: string): IGroup;
  removeGroup(name: string): IManager;
  removeGroups(names: string | string[]): IManager;
  removeAllGroups(): IManager;
  playGroup(name: string): Promise<Event[]>;
  playGroups(names: string | string[]): Promise<Event[]>;
  getGroupVolume(name?: string): number;
  setGroupVolume(value: number, groupName?: string): IManager;
  createFade(options?: IFadeOptions): IFade;
  createPlaylist(options: IPlaylistOptions): IPlaylist;
  addPlaylist(name: string, options: IPlaylistOptions): IPlaylist;
  addPlaylists(playlists: IPlaylistsMap): IManager;
  getPlaylist(name: string): IPlaylist;
  removePlaylist(name: string): IManager;
  removePlaylists(names: string | string[]): IManager;
  removeAllPlaylists(): IManager;
  playPlaylist(name: string): Promise<void>;
  playPlaylists(names: string | string[]): void;
  stopPlaylist(name: string): IManager;
  stopPlaylists(names: string | string[]): IManager;
  createSound(options: ICreateSoundOptions): Promise<ISound>;
  addSound(name: string, options: ICreateSoundOptions, groupName?: string): Promise<ISound>;
  addSounds(sounds: ISoundsMap, groupName?: string): IManager;
  getSound(name: string, groupName?: string): ISound;
  removeSound(name: string, groupName?: string): IManager;
  removeSounds(names: string | string[], groupName?: string): IManager;
  removeAllSounds(groupName?: string): IManager;
  playSound(name: string, groupName?: string): Promise<Event>;
  playSounds(names: string | string[], groupName?: string): Promise<Event[]>;
  playAllSounds(groupName?: string): Promise<Event[]>;
  pauseSound(name: string, groupName?: string): IManager;
  pauseSounds(names: string | string[], groupName?: string): IManager;
  pauseAllSounds(groupName?: string): IManager;
  stopSound(name: string, groupName?: string): IManager;
  stopSounds(names: string | string[], groupName?: string): IManager;
  stopAllSounds(groupName?: string): IManager;
  getSoundVolume(name: string, groupName?: string): number;
  setSoundVolume(name: string, value: number, groupName?: string): IManager;
  updateAllAudioElementsVolume(): IManager;
  generateAudioPanelElement(): HTMLElement;
  updateAudioPanelElement(): IManager;
  panelRegister(soundOrGroup: ISound | IGroup): IManager;
  panelDeregister(soundOrGroup: ISound | IGroup): IManager;
}
