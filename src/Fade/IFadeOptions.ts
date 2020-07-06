import {
  EasingCurves,
} from '../enums/EasingCurves';
import {
  TFadeArg,
} from './TFadeArg';

export interface IFadeOptions {
  easingCurve?: TFadeArg<EasingCurves>;
  length?: TFadeArg<number>;
}
