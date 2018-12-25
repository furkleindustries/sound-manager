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
  public readonly easingCurve: IFadeArgumentObject<EasingCurves | null> = {
    in: EasingCurves.Quadratic,
    out: EasingCurves.Quadratic,
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

    if (easingCurve) {
      if (Object.values(EasingCurves).includes(easingCurve)) {
        this.easingCurve = {
          in: easingCurve as EasingCurves,
          out: easingCurve as EasingCurves,
        };
      } else if (Array.isArray(easingCurve) && easingCurve.length === 2) {
        this.easingCurve = {
          in: easingCurve[0] || null,
          out: easingCurve[1] || null,
        };
      } else if ('in' in (easingCurve as IFadeArgumentObject<EasingCurves | null>) &&
                 'out' in (easingCurve as IFadeArgumentObject<EasingCurves | null>))
      {
        this.easingCurve = {
          ...easingCurve as IFadeArgumentObject<EasingCurves | null>,
        };
      }
    }

    if (!this.easingCurve.in && !this.easingCurve.out) {
      throw new Error();      
    }
    
    if (length) {
      if (typeof length === 'number' && length > 0) {
        this.length = {
          in: length,
          out: length,
        };
      } else if (Array.isArray(length) && length.length === 2) {
        this.length = {
          in: length[0] || 0,
          out: length[1] || 0,
        };
      } else if ('in' in (length as IFadeArgumentObject<number>) &&
                 'out' in (length as IFadeArgumentObject<number>))
      {
        this.length = { ...length as IFadeArgumentObject<number>, };
      }
    }
  }
}
