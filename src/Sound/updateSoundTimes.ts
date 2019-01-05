import {
  assert,
} from '../assertions/assert';
import {
  assertValid,
} from '../assertions/assertValid';
import {
  ISound,
} from './ISound';

export function updateSoundTimes(sound: ISound, audioElement?: HTMLAudioElement | null) {
  assert(sound);
  const trackPosition = sound.getTrackPosition();
  if (sound.isWebAudio()) {
    /* Reset the started time. */
    sound.__startedTime = sound.getContextCurrentTime() - trackPosition;
  } else {
    /* Set the current time to the track position. */
    assertValid<HTMLAudioElement>(audioElement).currentTime = trackPosition;
  }
}