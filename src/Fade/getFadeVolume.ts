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
  stoppingTime,
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

  if (!isStopping && fade.easingCurve.in && inLen >= time) {
    // Fading in.
    return getFadeValueAtTime({
      change: 1,
      curve: fade.easingCurve.in,
      fadeDuration: inLen,
      initial: 0,
      time: time - startingTime,
    });
  } else if (fade.easingCurve.out &&
      fadeOnLoops === true &&
      (isStopping || duration - outLen <= time))
  {
    // Get the last volume before the fadeout began.
    const initial = getFadeValueAtTime({
      initial: 1,
      change: -1,
      curve: fade.easingCurve.out,
      fadeDuration: outLen,
      time: stoppingTime,
    });

    // Fading out.
    return getFadeValueAtTime({
      initial,
      change: -initial,
      curve: fade.easingCurve.out,
      fadeDuration: outLen,
      time: time - stoppingTime,
    });
  }

  return 1;
};
