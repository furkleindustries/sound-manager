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
    const currentTime = sound.getContextCurrentTime() / 1000;
    sound.getFadeGainNode().gain.setValueAtTime(
      sound.getFadeVolume(),
      currentTime + time,
    );
  }
};
