import {
  ISound,
} from './ISound';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export const strings = {
  AUDIO_ELEMENT_INVALID:
    'The audio element argument was not present in playAudioSource.',

  SOUND_INVALID:
    'The sound argument was not provided to playAudioSource.',

  SOUND_PLAYING:
    'The Sound provided to playAudioSource was already playing.',
};

export const playAudioSource = (
  sound: ISound,
  audioElement?: HTMLAudioElement| null,
) => {
  assert(
    sound,
    strings.SOUND_INVALID,
  );

  assert(
    !sound.isPlaying(),
    strings.SOUND_PLAYING,
  );

  /* Set the actual audio element volume to the product of manager, group,
    * and sound volumes. */
  const safeAudioElement = assertValid<HTMLAudioElement>(
    audioElement,
    strings.AUDIO_ELEMENT_INVALID,
  );

  sound.updateAudioElementVolume();

  // Wait to ensure no clashes with pause DOM events.
  setTimeout(() => {
    /* Starts the audio element. This may involve buffering. */
    safeAudioElement.play();
  }, 5);
}
