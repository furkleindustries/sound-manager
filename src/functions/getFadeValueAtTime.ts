import {
  EasingCurves,
} from '../enums/EasingCurves';
import {
  getEasingFunction,
} from './getEasingFunction';

export const getFadeValueAtTime = ({
  change,
  curve,
  fadeDuration: duration,
  initial,
  time
}: {
  change: number,
  curve: EasingCurves,
  fadeDuration: number,
  initial: number,
  time: number,
}) => {
  const value = Math.max(
    0,
    Math.min(
      1,
      getEasingFunction(curve)(
        time,
        initial,
        change,
        duration,
      ),
  ));

  return value;
};
