import {
  ISound,
} from './ISound';

export function trySetSoundLoop(sound: ISound, value?: boolean) {
  if (typeof value === 'function') {
    sound.setLoop(value);
  }
}
