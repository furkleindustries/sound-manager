import {
  assertType,
} from '../assertions/assertType';
import {
  IFade,
} from './IFade';
import {
  ISound,
} from '../Sound/ISound';

export function scheduleWebAudioFadeOut(sound: ISound) {
  const fade = assertType<IFade>(sound.getFade(), Boolean);
  const outLength = Number(fade.length.out);
  for (let ii = 0; ii < outLength * 20; ii += 1) {
    const time = ii / 20;
    sound.getFadeGainNode().gain.setValueAtTime(
      sound.getFadeVolume(),
      sound.getContextCurrentTime() + sound.getDuration() - time,
    );
  }
}
