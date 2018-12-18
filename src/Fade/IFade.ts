import {
  EasingCurves,
} from './EasingCurves';
import {
  EasingDirections,
} from './EasingDirections';

export interface IFade {
  easingCurve: EasingCurves;
  easingDirection: EasingDirections;
  length: number;
}
