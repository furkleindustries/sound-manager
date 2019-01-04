import {
  IPlaylist,
} from '../Playlist/IPlaylist';

export function loopIsInBoundInteger(playlist: IPlaylist, loopedTimes: number) {
  return playlist.loop > loopedTimes;
}
