import {
  IPlaylist,
} from '../Playlist/IPlaylist';
import {
  loopIsInBoundInteger,
} from './loopIsInBoundInteger';

export const shouldLoopPlaylist = (
  playlist: IPlaylist,
  loopedTimes: number,
) => {
  const loopIsValid = playlist.loopIsValid();

  /* Allow true to be used for loop, signifying an infinite loop. */
  const loopIsTrue = playlist.loop === true;

  /* Allow integers to be used for the loop value, causing the
   * playlist to loop that many times. */
  const loopInBound = loopIsInBoundInteger(playlist, loopedTimes);

  return loopIsValid && (loopIsTrue || loopInBound);
};
