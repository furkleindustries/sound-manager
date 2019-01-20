import {
  IFade,
} from './IFade';
import {
  ISound,
} from '../Sound/ISound';
import {
  assertValid,
} from 'ts-assertions';

export function scheduleWebAudioFadeIn(sound: ISound) {
  const fade = assertValid<IFade>(sound.getFade());
  const inLength = Number(fade.length.in);
  for (let ii = 0; ii <= inLength * 20; ii += 1) {
    const time = ii / 20;
    sound.getFadeGainNode().gain.setValueAtTime(
      sound.getFadeVolume(),
      sound.getContextCurrentTime() + time,
    );
  }
}
