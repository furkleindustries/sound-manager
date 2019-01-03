import {
  assertValid,
} from '../assertions/assertValid';
import {
  IFade,
} from './IFade';
import {
  ISound,
} from '../Sound/ISound';

export function scheduleWebAudioFadeOut(sound: ISound) {
  const fade = assertValid<IFade>(sound.getFade());
  const outLength = Number(fade.length.out);
  for (let ii = 0; ii < outLength * 20; ii += 1) {
    const time = ii / 20;
    sound.getFadeGainNode().gain.setValueAtTime(
      sound.getFadeVolume(),
      sound.getContextCurrentTime() + sound.getDuration() - time,
    );
  }
}
