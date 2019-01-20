import {
  IFade,
} from './IFade';
import {
  ISound,
} from '../Sound/ISound';
import {
  scheduleWebAudioFadeIn,
} from './scheduleWebAudioFadeIn';
import {
  scheduleWebAudioFadeOut,
} from './scheduleWebAudioFadeOut';
import {
  assertValid,
} from 'ts-assertions';

export function scheduleWebAudioFades(sound: ISound) {
  const fade = assertValid<IFade>(sound.getFade());
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
