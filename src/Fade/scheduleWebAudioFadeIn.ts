import {
  IFade,
} from './IFade';
import {
  ISound,
} from '../Sound/ISound';
import {
  assertValid,
} from 'ts-assertions';

export const scheduleWebAudioFadeIn = (sound: ISound) => {
  const fade = assertValid<IFade>(sound.getFade());
  const inLength = Number(fade.length.in);
  for (let time = 0; time <= inLength; time += 1) {
    sound.getFadeGainNode().gain.setValueAtTime(
      sound.getFadeVolume(),
      sound.getContextCurrentTime() + time,
    );
  }
};
