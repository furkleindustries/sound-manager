import {
  EasingCurves,
} from '../enums/EasingCurves';
import {
  fadeArgumentToFadeProperty,
} from './fadeUtils';
import {
  IFade,
} from './IFade';
import {
  IFadeProperty,
} from './IFadeProperty';
import {
  IFadeOptions,
} from './IFadeOptions';

export class Fade implements IFade {
  public static readonly defaultCurve: EasingCurves = EasingCurves.Quadratic;
  public static readonly defaultLength: number = 2;

  public readonly easingCurve: IFadeProperty<EasingCurves> = {
    in: Fade.defaultCurve,
    out: Fade.defaultCurve,
  };

  public readonly length: IFadeProperty<number> = {
    in: Fade.defaultLength,
    out: Fade.defaultLength,
  };

  constructor(options?: IFadeOptions) {
    const opts = options || {};
    const {
      easingCurve,
      length,
    } = opts;

    if (easingCurve) {
      this.easingCurve = fadeArgumentToFadeProperty(
        easingCurve,
        null,
        (arg: any) => Object.values(EasingCurves).indexOf(arg) !== -1,
      );
    }

    if (length) {
      this.length = fadeArgumentToFadeProperty(
        length,
        0,
        (arg: any) => typeof arg === 'number' && arg > 0,
      );
    }
  }
}
