import {
  assert,
} from '../assertions/assert';
import {
  assertValid,
} from '../assertions/assertValid';
import {
  ISound,
} from './ISound';
import {
  strings,
} from './strings';

export function playAudioSource(sound: ISound, audioElement?: HTMLAudioElement| null) {
  assert(
    sound,
    strings.PLAY_AUDIO_SOURCE_SOUND_INVALID,
  );

  assert(
    !sound.isPlaying(),
    strings.PLAY_AUDIO_SOURCE_SOUND_PLAYING,
  );

  const trackPosition = sound.getTrackPosition();
  if (sound.isWebAudio()) {
    /* Play the source node, respecting a possible pause. */
    sound.getSourceNode().start(trackPosition);
  } else {
    /* Set the actual audio element volume to the product of manager, group,
     * and sound volumes. */
    const safeAudioElement = assertValid<HTMLAudioElement>(
      audioElement,
      strings.PLAY_AUDIO_SOURCE_AUDIO_ELEMENT_INVALID,
    );
  
    sound.updateAudioElementVolume();

    /* Just to be safe, we set the current time of the audio element to the
     * track position. */
    safeAudioElement.currentTime = trackPosition;

    /* Starts the audio element. This may involve buffering. */
    safeAudioElement.play();
  }
}
