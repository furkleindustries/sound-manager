import {
  ISound,
} from './ISound';

export function updateSoundTimes(sound: ISound, audioElement?: HTMLAudioElement) {
  if (!sound) {
    throw new Error();
  }

  const trackPosition = sound.getTrackPosition();
  if (sound.isWebAudio()) {
    /* Reset the started time. */
    sound.__startedTime = sound.getContextCurrentTime() - trackPosition;
  } else {
    if (!audioElement) {
      throw new Error();
    }

    /* Set the current time to the track position. */
    audioElement.currentTime = trackPosition;
  }
}