import {
  ISound,
} from './ISound';

export function trySetSoundLoop(sound: ISound, value?: boolean) {
  if (typeof value === 'boolean') {
    sound.setLoop(value);
  }
}
