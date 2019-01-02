import {
  ISound,
} from '../Sound/ISound';
import {
  scheduleWebAudioFadeIn,
} from './scheduleWebAudioFadeIn';
import {
  scheduleWebAudioFadeOut,
} from './scheduleWebAudioFadeOut';

export function scheduleWebAudioFades(sound: ISound) {
  const fade = sound.getFade();
  if (!fade) {
    throw new Error();
  }

  const trackPosition = sound.getTrackPosition();
  const duration = sound.getDuration();
  const inLength = Number(fade.length.in);
  const outLength = Number(fade.length.out);

  if (inLength && inLength >= trackPosition) {
    scheduleWebAudioFadeIn(sound);
  }

  if (outLength && outLength >= duration - trackPosition) {
    scheduleWebAudioFadeOut(sound);  
  }
}
