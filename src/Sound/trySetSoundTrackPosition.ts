import {
  ISound,
} from './ISound';

export function trySetSoundTrackPosition(sound: ISound, value?: number) {
  if (typeof value !== 'undefined' && value > 0) {
    sound.setTrackPosition(value);
  }
}
