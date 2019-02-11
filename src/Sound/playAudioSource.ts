import {
  ISound,
} from './ISound';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export const strings = {
  AUDIO_ELEMENT_INVALID:
    'The audio element argument was not present in playAudioSource. This ' +
    'argument is necessary for a song to be played in HTML Audio mode.',

  SOUND_INVALID:
    'The sound argument was not provided to playAudioSource.',

  SOUND_PLAYING:
    'The Sound provided to playAudioSource was already playing.',
};

export function playAudioSource(
  sound: ISound,
  audioElement?: HTMLAudioElement| null,
  contextTime?: number,
)
{
  assert(
    sound,
    strings.SOUND_INVALID,
  );

  assert(
    !sound.isPlaying(),
    strings.SOUND_PLAYING,
  );

  const trackPosition = sound.getTrackPosition();
  if (sound.isWebAudio()) {
    assert(contextTime! >= 0);
    /* Play the source node, respecting a possible pause. */
    sound.getSourceNode().start(contextTime, trackPosition);
  } else {
    /* Set the actual audio element volume to the product of manager, group,
     * and sound volumes. */
    const safeAudioElement = assertValid<HTMLAudioElement>(
      audioElement,
      strings.AUDIO_ELEMENT_INVALID,
    );

    sound.updateAudioElementVolume();

    /* Just to be safe, we set the current time of the audio element to the
     * track position. */
    safeAudioElement.currentTime = trackPosition;

    /* Starts the audio element. This may involve buffering. */
    safeAudioElement.play();
  }
}
