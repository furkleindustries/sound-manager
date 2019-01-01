import {
  IPlaylist,
} from '../Playlist/IPlaylist';

export interface IPlaylistsMap {
  readonly [key: string]: IPlaylist;
}
