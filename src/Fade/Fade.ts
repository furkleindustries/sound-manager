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
        null,
        (arg: any) => Object.values(EasingCurves).indexOf(arg) !== -1,
      );
    }

    if (length) {
      this.length = this.__argToProp(
        length,
        0,
        (arg: any) => typeof arg === 'number' && arg > 0,
      ) 
    }
  }

  private __argToProp<T>(arg: TFadeArg<T>, defaultValue: T | null, validator: (arg: T) => boolean): IFadeArgumentObject<T> {
    let toReturn: IFadeArgumentObject<T>;
    let valids: [ boolean, boolean ];

    const isValid = (arg: any): arg is T => arg === null || validator(arg);
    if (isValid(arg)) {
      valids = [ true, true ];
      toReturn = {
        in: arg,
        out: arg,
      };
    } else if (Array.isArray(arg)) {
      if (arg.length === 2) {
        valids = [
          isValid(arg[0]),
          isValid(arg[1]),
        ];

        toReturn = {
          in: valids[0] ? arg[0] : defaultValue,
          out: valids[1] ? arg[1] : defaultValue,
        };
      } else {
        throw new Error();
      }
    } else if (typeof arg === 'object') {
      const argObj = arg as IFadeArgumentObject<T>;
      valids = [
        isValid(argObj.in),
        isValid(argObj.out),
      ];

      toReturn = {
        in: valids[0] ? argObj.in : defaultValue,
        out: valids[1] ? argObj.out : defaultValue,
      };
    } else {
      throw new Error();
    }

    if (!valids[0] && !valids[1]) {
      throw new Error();
    }

    return toReturn;
  }
}
