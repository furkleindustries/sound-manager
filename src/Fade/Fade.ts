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
import {
  TFadeArg,
} from './TFadeArg';

export class Fade implements IFade {
  public static readonly defaultCurve: EasingCurves = EasingCurves.Quadratic;
  public static readonly defaultLength: number = 2;

  public readonly easingCurve: IFadeArgumentObject<EasingCurves> = {
    in: Fade.defaultCurve,
    out: Fade.defaultCurve,
  };

  public readonly length: IFadeArgumentObject<number> = {
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
      this.easingCurve = this.__argToProp(
        easingCurve,
        Fade.defaultCurve,
        (arg: any) => Object.values(EasingCurves).indexOf(arg) !== -1,
      );
    }

    if (length) {
      this.length = this.__argToProp(
        length,
        Fade.defaultLength,
        (arg: any) => arg > 0,
      ) 
    }
  }

  private __argToProp<T>(arg: TFadeArg<T>, defaultValue: T, validator: (arg: T) => boolean): IFadeArgumentObject<T> {
    const isValid = (arg: any): arg is T => arg === null || validator(arg);
    const tArg = arg as T
    if (isValid(tArg)) {
      return {
        in: tArg,
        out: tArg,
      };
    } else if (Array.isArray(arg)) {
      if (arg.length === 2) {
        const valids = [
          isValid(arg[0]),
          isValid(arg[1]),
        ];

        if (!valids.length) {
          throw new Error();
        }

        return {
          in: valids[0] ? arg[0] : defaultValue,
          out: valids[1] ? arg[1] : defaultValue,
        };
      } else {
        throw new Error();
      }
    } else if (typeof arg === 'object') {
      const argObj = arg as IFadeArgumentObject<T>;
      const valids = [
        isValid(argObj.in),
        isValid(argObj.out),
      ];

      if (!valids.length) {
        throw new Error();
      }

      return {
        in: valids[0] ? argObj.in : defaultValue,
        out: valids[1] ? argObj.out : defaultValue,
      };
    }

    throw new Error();
  }
}
