import {
  IFade,
} from './IFade';
import {
  ISound,
} from '../Sound/ISound';
import {
  assertValid,
} from 'ts-assertions';

export function scheduleWebAudioFadeOut(sound: ISound) {
  const fade = assertValid<IFade>(sound.getFade());
  const outLength = Number(fade.length.out);
  for (let time = 0; time < outLength; time += 1) {
    const currentTime = sound.getContextCurrentTime() / 1000;
    const duration = sound.getDuration() / 1000;
    sound.getFadeGainNode().gain.setValueAtTime(
      sound.getFadeVolume(),
      currentTime + duration - time,
    );
  }
}
