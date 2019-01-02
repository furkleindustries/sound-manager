import {
  ISound,
} from './ISound';

export function playAudioSource(sound: ISound) {
  const trackPosition = sound.getTrackPosition();
  if (sound.isWebAudio()) {
    /* Play the source node, respecting a possible pause. */
    sound.getSourceNode().start(trackPosition);
  } else {
    /* Set the actual audio element volume to the product of manager, group,
     * and sound volumes. */
    sound.updateAudioElementVolume();
    /* Starts the audio element. This may involve buffering. */
    sound.__audioElement!.play();
  }
}
