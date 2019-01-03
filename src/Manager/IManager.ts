import {
  IAnalysableNode,
} from '../Node/IAnalysableNode';
import {
  IManagerCreateSoundOptions,
} from '../interfaces/IManagerCreateSoundOptions';
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
  ISubmanagerMap,
} from './ISubmanagerMap';
import {
  IManagerNode,
} from '../Node/IManagerNode';

export interface IManager extends IManagerNode, IAnalysableNode {
  readonly groups: IGroupsMap;
  readonly playlists: IPlaylistsMap;
  readonly submanagers: ISubmanagerMap;
  getAudioContext(): AudioContext;
  createGroup(options?: IGroupOptions): IGroup;
  addGroup(name: string, options?: IGroupOptions): IGroup;
  addGroups(groups: IGroupsMap): IManager;
  getGroups(name: string): IGroup;
  getGroups(names: string[]): IGroup[];
  removeGroups(name: string): IManager;
  removeGroups(names: string[]): IManager;
  removeAllGroups(): IManager;
  playGroups(name: string): Promise<Event[]>;
  playGroups(names: string[]): Promise<Event[]>;
  getGroupVolume(name?: string): number;
  setGroupVolume(value: number, groupName?: string): IManager;
  createFade(options?: IFadeOptions): IFade;
  createPlaylist(options: IPlaylistOptions): IPlaylist;
  addPlaylist(name: string, options: IPlaylistOptions): IPlaylist;
  addPlaylists(playlists: IPlaylistsMap): IManager;
  getPlaylists(name: string): IPlaylist;
  getPlaylists(names: string[]): IPlaylist[];
  removePlaylists(name: string): IManager;
  removePlaylists(names: string[]): IManager;
  removeAllPlaylists(): IManager;
  playPlaylist(name: string): Promise<void>;
  playPlaylists(name: string): Promise<void>;
  playPlaylists(names: string[]): Promise<void>;
  stopPlaylists(name: string): IManager;
  stopPlaylists(names: string[]): IManager;
  createSound(options: IManagerCreateSoundOptions): Promise<ISound>;
  addSound(name: string, options: IManagerCreateSoundOptions, groupName?: string): Promise<ISound>;
  addSounds(sounds: ISoundsMap, groupName?: string): IManager;
  getSounds(name: string, groupName?: string): ISound;
  getSounds(names: string[], groupName?: string): ISound[];
  removeSounds(name: string, groupName?: string): IManager;
  removeSounds(names: string[], groupName?: string): IManager;
  removeAllSounds(groupName?: string): IManager;
  playSounds(name: string, groupName?: string): Promise<Event>;
  playSounds(names: string[], groupName?: string): Promise<Event[]>;
  playAllSounds(groupName?: string): Promise<Event[]>;
  pauseSounds(name: string, groupName?: string): IManager;
  pauseSounds(names: string[], groupName?: string): IManager;
  pauseAllSounds(groupName?: string): IManager;
  stopSounds(name: string, groupName?: string): IManager;
  stopSounds(names: string[], groupName?: string): IManager;
  stopAllSounds(groupName?: string): IManager;
  getSoundVolume(name: string, groupName?: string): number;
  setSoundVolume(name: string, value: number, groupName?: string): IManager;
  updateAllAudioElementsVolume(): IManager;
  generateAudioPanelElement(): HTMLElement;
  updateAudioPanelElement(): IManager;
  updatePanelRegistration(sound: ISound, value: boolean): IManager;
  updatePanelRegistration(group: IGroup, value: boolean): IManager;
}
