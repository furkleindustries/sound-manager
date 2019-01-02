import {
  assert,
} from '../assertions/assert';
import {
  ISound,
} from './ISound';

export function updateSoundTimes(sound: ISound, audioElement?: HTMLAudioElement) {
  assert(sound);
  const trackPosition = sound.getTrackPosition();
  if (sound.isWebAudio()) {
    /* Reset the started time. */
    sound.__startedTime = sound.getContextCurrentTime() - trackPosition;
  } else {
    assert(audioElement);
    /* Set the current time to the track position. */
    audioElement!.currentTime = trackPosition;
  }
}