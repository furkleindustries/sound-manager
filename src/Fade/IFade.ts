import {
  EasingCurves,
} from '../enums/EasingCurves';
import {
  IFadeProperty,
} from './IFadeProperty';

export interface IFade {
  readonly easingCurve: IFadeProperty<EasingCurves>;
  readonly length: IFadeProperty<number>;
}
