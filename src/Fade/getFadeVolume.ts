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
  const shouldSkipFadeForLoop = loop &&
    fadeOnLoops !== true &&
    loopIterationCount;

  if (!fade || shouldSkipFadeForLoop) {
    return 1;
  }

  const inLen = ;
  const outLen = Number(fade.length.out);

  // Fading in.
  if (fade.easingCurve.in && inLen >= time) {
    return getFadeValueAtTime({
      change: targetVolume,
      curve: fade.easingCurve.in,
      duration: fade.length.in || 0,
      initial: 0,
      time,
    });
  } else if (fade.easingCurve.out && outLen >= duration - time) {
    return getFadeValueAtTime({
      change: -targetVolume,
      curve: fade.easingCurve.out,
      duration: fade.length.out || 0,
      initial: targetVolume,
      time,
    });
  }

  return 1;
};
