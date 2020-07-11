import {
  getFadeValueAtTime,
} from '../functions/getFadeValueAtTime';
import {
  IGetFadeVolumeArgs,
} from './IGetFadeVolumeArgs';

export const getFadeVolume = ({
  duration,
  fade,
  fadeOnLoops,
  isStopping,
  loop,
  loopIterationCount,
  startingTime,
  time,
}: IGetFadeVolumeArgs) => {
  const shouldSkipFadeForLoop = loop === true &&
    fadeOnLoops === false &&
    loopIterationCount! > 0;

  if (!fade || shouldSkipFadeForLoop) {
    return 1;
  }

  const inLen = fade.length.in || 0;
  const outLen = fade.length.out || 0;

  if (fade.easingCurve.in && inLen >= time) {
    // Fading in.
    return getFadeValueAtTime({
      change: 1,
      curve: fade.easingCurve.in,
      fadeDuration: inLen,
      initial: 0,
      time: time - startingTime,
    });
  } else if (fade.easingCurve.out &&
      (isStopping || duration - outLen <= time))
  {
    // Fading out.
    return getFadeValueAtTime({
      change: 1,
      curve: fade.easingCurve.out,
      fadeDuration: outLen,
      initial: 0,
      time: time - startingTime,
    });
  }

  return 1;
};
