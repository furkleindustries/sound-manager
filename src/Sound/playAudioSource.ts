import {
  assertValid,
} from '../assertions/assertValid';
import {
  ISound,
} from './ISound';

export function playAudioSource(sound: ISound, audioElement?: HTMLAudioElement| null) {
  const trackPosition = sound.getTrackPosition();
  if (sound.isWebAudio()) {
    /* Play the source node, respecting a possible pause. */
    sound.getSourceNode().start(trackPosition);
  } else {
    /* Set the actual audio element volume to the product of manager, group,
     * and sound volumes. */
    sound.updateAudioElementVolume();
    /* Starts the audio element. This may involve buffering. */
    assertValid<HTMLAudioElement>(audioElement).play();
  }
}
