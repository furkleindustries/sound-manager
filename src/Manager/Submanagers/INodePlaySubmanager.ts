import {
  IPlaylistsMap,
} from '../IPlaylistsMap';
import { IPlaylistOptions } from '../../Playlist/IPlaylistOptions';
import { IPlaylist } from '../../Playlist/IPlaylist';

export interface INodePlaySubmanager {
  __playlists: IPlaylistsMap;
  readonly playlists: IPlaylistsMap;
  playGroups(name: string): Promise<Event[]>;
  playGroups(names: string[]): Promise<Event[]>;
  playSounds(name: string, groupName?: string): Promise<Event>;
  playSounds(names: string[], groupName?: string): Promise<Event[]>;
  playAllSounds(groupName?: string): Promise<Event[]>;
  pauseSounds(name: string, groupName?: string): this;
  pauseSounds(names: string[], groupName?: string): this;
  pauseAllSounds(groupName?: string): this;
  stopSounds(name: string, groupName?: string): this;
  stopSounds(names: string[], groupName?: string): this;
  stopAllSounds(groupName?: string): this;
  addPlaylist(name: string, options: IPlaylistOptions): IPlaylist;
  addPlaylists(playlists: IPlaylistsMap): this;
  getPlaylists(name: string): IPlaylist;
  getPlaylists(names: string[]): IPlaylist[];
  playPlaylist(name: string): Promise<void>;
  playPlaylists(name: string): Promise<void>;
  playPlaylists(names: string[]): Promise<void>;
  stopPlaylists(name: string): this;
  stopPlaylists(names: string[]): this;
}
