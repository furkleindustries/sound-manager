import {
  getFadeValueAtTime,
} from '../functions/getFadeValueAtTime';
import {
  IGetFadeVolumeArgs,
} from './IGetFadeVolumeArgs';

export const getFadeVolume = ({
  fade,
  duration,
  loop,
  loopIterationCount,
  fadeOnLoops,
  targetVolume,
  time,
}: IGetFadeVolumeArgs) => {
  const shouldSkipFadeForLoop = loop === true &&
    fadeOnLoops === true &&
    loopIterationCount! > 0;

  if (!fade || shouldSkipFadeForLoop) {
    return 1;
  }

  const inLen = fade.length.in || 0;
  const outLen = fade.length.out || 0;

  // Fading in.
  if (fade.easingCurve.in && inLen >= time) {
    return getFadeValueAtTime({
      change: targetVolume,
      curve: fade.easingCurve.in,
      duration: inLen,
      initial: 0,
      time,
    });
  } else if (fade.easingCurve.out && outLen >= duration - time) {
    return getFadeValueAtTime({
      change: -targetVolume,
      curve: fade.easingCurve.out,
      duration: outLen,
      initial: targetVolume,
      time,
    });
  }

  return 1;
};
