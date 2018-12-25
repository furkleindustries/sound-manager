import {
  EasingCurves,
} from './EasingCurves';
import {
  IFadeArgumentObject,
} from './IFadeArgumentObject';

export interface IFade {
  readonly easingCurve: IFadeArgumentObject<EasingCurves | null>;
  readonly length: IFadeArgumentObject<number>;
}
