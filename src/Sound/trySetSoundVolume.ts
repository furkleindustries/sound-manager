import {
  ISound,
} from './ISound';
import {
  isValidVolume,
} from '../functions/isValidVolume';

export function trySetSoundVolume(sound: ISound, value?: number) {
  if (isValidVolume(value)) {
    sound.setVolume(value);
  }
}