import {
  getFadeValueAtTime,
} from '../functions/getFadeValueAtTime';
import {
  IGetFadeVolumeArgs,
} from './IGetFadeVolumeArgs';

export const getFadeVolume = ({
  fade,
  trackPosition,
  duration,
  iterationCount = 0,
  fadeOnLoops = false,
  targetVolume,
}: IGetFadeVolumeArgs) => {
  if (!fade) {
    return 1;
  } else if (fadeOnLoops !== true && iterationCount) {
    return 1;
  }

  const inLen = Number(fade.length.in);
  const outLen = Number(fade.length.out);
  const time = trackPosition * 1000;
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
