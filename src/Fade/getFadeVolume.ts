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
    !fadeOnLoops &&
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
      (fadeOnLoops === true || isStopping) &&
      (isStopping || duration - outLen <= time))
  {
    // Fading out.
    return getFadeValueAtTime({
      initial: 1,
      change: -1,
      curve: fade.easingCurve.out,
      fadeDuration: outLen,
      time: time - stoppingTime,
    });
  }

  return 1;
};
