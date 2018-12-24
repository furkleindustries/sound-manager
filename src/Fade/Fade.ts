import {
  EasingCurves,
} from './EasingCurves';
import {
  IFade,
} from './IFade';
import {
  IFadeArgumentObject,
} from './IFadeArgumentObject';
import {
  IFadeOptions,
} from './IFadeOptions';

export class Fade implements IFade {
  public readonly easingCurve: IFadeArgumentObject<EasingCurves> = {
    in: EasingCurves.EqualPower,
    out: EasingCurves.EqualPower,
  };

  public readonly length: IFadeArgumentObject<number> = {
    in: 2,
    out: 2,
  };

  constructor(options?: IFadeOptions) {
    const opts = options || {};
    const {
      easingCurve,
      length,
    } = opts;

    if (Object.values(EasingCurves).includes(easingCurve)) {
      this.easingCurve = {
        in: easingCurve as EasingCurves,
        out: easingCurve as EasingCurves,
      };
    }

    if (length) {
      if (typeof length === 'number' && length > 0) {
        this.length = {
          in: length,
          out: length,
        };
      } else if (Array.isArray(length) && length.length === 2) {
        this.length = {
          in: length[0],
          out: length[1],
        };
      } else if ('in' in (length as IFadeArgumentObject<number>) &&
                 'out' in (length as IFadeArgumentObject<number>))
      {
        this.length = length as IFadeArgumentObject<number>;
      }
    }
  }
}
