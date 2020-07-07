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
  // Fading in.
  if (fade.easingCurve.in && inLen >= trackPosition) {
    return getFadeValueAtTime({
      change: targetVolume,
      curve: fade.easingCurve.in,
      duration: inLen,
      initial: 0,
      time: trackPosition,
    });
  } else if (fade.easingCurve.out && outLen >= duration - trackPosition) {
    return getFadeValueAtTime({
      change: -targetVolume,
      curve: fade.easingCurve.out,
      duration: outLen,
      initial: targetVolume,
      time: outLen - (duration - trackPosition),
    });
  }

  return 1;
}
