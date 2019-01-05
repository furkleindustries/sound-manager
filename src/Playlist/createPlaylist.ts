import {
  assertValid,
} from '../assertions/assertValid';
import {
  IPlaylistOptions,
} from './IPlaylistOptions';
import {
  Playlist,
} from './Playlist';

export function createPlaylist(options: IPlaylistOptions) {
  return new Playlist(assertValid<IPlaylistOptions>(options));
}
