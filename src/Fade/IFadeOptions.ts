import {
  EasingCurves,
} from './EasingCurves';
import {
  TFadeArg,
} from './TFadeArg';

export interface IFadeOptions {
  easingCurve?: TFadeArg<EasingCurves>;
  length?: TFadeArg<number>;
}
