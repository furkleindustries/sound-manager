import {
  ISound,
} from '../Sound/ISound';

export function scheduleWebAudioFadeIn(sound: ISound) {
  const fade = sound.getFade();
  if (!fade) {
    throw new Error();
  }

  const inLength = Number(fade.length.in);
  for (let ii = 0; ii <= inLength * 20; ii += 1) {
    const time = ii / 20;
    sound.getFadeGainNode().gain.setValueAtTime(
      sound.getFadeVolume(),
      sound.getContextCurrentTime() + time,
    );
  }
}
