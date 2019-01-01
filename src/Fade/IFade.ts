import {
  EasingCurves,
} from './EasingCurves';
import {
  IFadeArgumentObject,
} from './IFadeArgumentObject';

export interface IFade {
  readonly easingCurve: IFadeArgumentObject<EasingCurves>;
  readonly length: IFadeArgumentObject<number>;
}
