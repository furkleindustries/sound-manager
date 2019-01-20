import {
  IPlaylistOptions,
} from './IPlaylistOptions';
import {
  Playlist,
} from './Playlist';
import {
  assertValid,
} from 'ts-assertions';

export function createPlaylist(options: IPlaylistOptions) {
  return new Playlist(assertValid<IPlaylistOptions>(options));
}
