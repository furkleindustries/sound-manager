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
      } else if (Array.isArray(easingCurve)) {
        if (easingCurve.length === 2) {
          this.easingCurve = {
            in: easingCurve[0],
            out: easingCurve[1],
          };
        } else {
          throw new Error();
        }
      } else if (typeof easingCurve === 'object') {
        this.easingCurve = {
          in: easingCurve.in,
          out: easingCurve.out,
        };
      } else {
        throw new Error();
      }
    }

    if (!this.easingCurve.in && !this.easingCurve.out) {
      throw new Error();      
    }

    /* Coerce all falsy values to null. */
    this.easingCurve = {
      in: this.easingCurve.in || null,
      out: this.easingCurve.out || null,
    };

    if (length) {
      if (typeof length === 'number' && length > 0) {
        this.length = {
          in: length,
          out: length,
        };
      } else if (Array.isArray(length)) {
        if (length.length === 2) {
          this.length = {
            in: length[0] || 0,
            out: length[1] || 0,
          };
        } else {
          throw new Error();
        }
      } else if (typeof length === 'object') {
        this.length = {
          in: length.in,
          out: length.out,
        };
      } else {
        throw new Error();
      }
    }

    if (!this.length.in && !this.length.out) {
      throw new Error();
    }

    /* Coerce all falsy values to 0. */
    this.length = {
      in: this.length.in || 0,
      out: this.length.out || 0,
    };
  }
}
