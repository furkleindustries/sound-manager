import {
  ISound,
} from './ISound';
import {
  loopIsValid,
} from '../Playlist/loopIsValid';

export function trySetSoundLoop(sound: ISound, value?: boolean | number) {
  if (loopIsValid(value)) {
    sound.setLoop(value);
  }
}
