import {
  IPlaylist,
} from '../Playlist/IPlaylist';
import {
  IPlaylistOptions,
} from '../Playlist/IPlaylistOptions';
import {
  IPlaylistsMap,
} from './IPlaylistsMap';

export interface IPlayerSubmanager {
  readonly playlists: IPlaylistsMap;
  playGroup(name: string): Promise<void[]>;
  playGroups(names: string[]): Promise<void[]>;
  playSound(name: string, groupName?: string): Promise<void>;
  playSounds(names: string[], groupName?: string): Promise<void[]>;
  playAllSounds(groupName?: string): Promise<void[]>;
  pauseSound(name: string, groupName?: string): this;
  pauseSounds(names: string[], groupName?: string): this;
  pauseAllSounds(groupName?: string): this;
  stopSound(name: string, groupName?: string): this;
  stopSounds(names: string[], groupName?: string): this;
  stopAllSounds(hard?: boolean, groupName?: string): this;
  addPlaylist(name: string, options: IPlaylistOptions): IPlaylist;
  addPlaylists(playlists: IPlaylistsMap): this;
  hasPlaylist(name: string): boolean;
  getPlaylist(name: string): IPlaylist;
  hasPlaylists(names: string[]): boolean;
  getPlaylists(names: string[]): IPlaylist[];
  playPlaylist(name: string): Promise<void>;
  playPlaylists(names: string[]): Promise<void>;
  stopPlaylist(name: string): this;
  stopPlaylists(names: string[]): this;
}
