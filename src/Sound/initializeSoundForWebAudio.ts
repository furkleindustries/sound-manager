import {
  assert,
} from '../assertions/assert';
import {
  getNewSourceNode,
} from './getNewSourceNode';
import {
  ISound,
} from './ISound';

export function initializeSoundForWebAudio(sound: ISound, buffer: AudioBuffer) {
  assert(sound);
  assert(buffer);

  const context = sound.getAudioContext();

  /* Generate the first source node. */
  sound.__sourceNode = getNewSourceNode(context, buffer);

  /* Generate the gain node used for fading volume. */
  sound.__fadeGainNode = context.createGain();

  /* Connect the source node to the fade gain node. */
  sound.__sourceNode.connect(sound.__fadeGainNode);

  /* Connect the fade gain node to the sound's gain node. */
  sound.__fadeGainNode.connect(sound.getGainNode());
}
