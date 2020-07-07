import {
  EasingCurves,
} from '../enums/EasingCurves';
import {
  getEasingFunction,
} from './getEasingFunction';

export const getFadeValueAtTime = ({
  change,
  curve,
  duration,
  initial,
  time
}: {
  change: number,
  curve: EasingCurves,
  duration: number,
  initial: number,
  time: number,
}) => Math.max(
  0,
  Math.min(
    1,
    getEasingFunction(curve)(
      time,
      initial,
      change,
      duration,
    ),
  ),
);
