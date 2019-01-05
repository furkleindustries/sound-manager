import {
  ISound,
} from './ISound';

export function clearScheduledFadesOnSound(sound: ISound) {
  delete sound.__fadeOverride;

  if (sound.isWebAudio()) {
    const fadeGain = sound.getFadeGainNode();
    fadeGain.gain.cancelScheduledValues(sound.getContextCurrentTime());
    fadeGain.gain.setValueAtTime(1, sound.getContextCurrentTime());
  }
}
