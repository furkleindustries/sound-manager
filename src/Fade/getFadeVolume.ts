import {
  getFadeValueAtTime,
} from '../functions/getFadeValueAtTime';
import {
  IFade,
} from './IFade';

export function getFadeVolume(
  fade: IFade,
  trackPosition: number,
  duration: number,
)
{
  if (!fade) {
    return 1;
  }

  const inLen = Number(fade.length.in);
  const outLen = Number(fade.length.out);
  if (fade.easingCurve.in && inLen >= trackPosition) {
    return getFadeValueAtTime({
      change: 1,
      curve: fade.easingCurve.in,
      duration: inLen,
      initial: 0,
      time: trackPosition,
    });
  } else if (fade.easingCurve.out && outLen >= duration - trackPosition) {
    return getFadeValueAtTime({
      change: -1,
      curve: fade.easingCurve.out,
      duration: outLen,
      initial: 1,
      time: outLen - (duration - trackPosition),
    });
  }

  return 1;
}
