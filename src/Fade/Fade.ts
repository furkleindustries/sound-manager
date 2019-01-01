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
      toReturn = this.__structureFadePropFromValue(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length === 2) {
        valids = [
          isValid(arg[0]),
          isValid(arg[1]),
        ];

        toReturn = this.__structureFadePropFromArray(arg);
      } else {
        throw new Error();
      }
    } else if (typeof arg === 'object') {
      const argObj = arg as IFadeArgumentObject<T>;
      valids = [
        isValid(argObj.in),
        isValid(argObj.out),
      ];

      toReturn = this.__structureFadePropFromObject(argObj);
    } else {
      throw new Error();
    }

    if (!valids[0] && !valids[1]) {
      throw new Error();
    }

    return {
      in: valids[0] ? toReturn.in : defaultValue,
      out: valids[1] ? toReturn.out : defaultValue,
    };
  }

  private __structureFadePropFromValue<T>(arg: T) {
    return {
      in: arg,
      out: arg,
    };
  }

  private __structureFadePropFromArray<T>(arg: [ T, T ]) {
    return {
      in: arg[0],
      out: arg[1],
    };
  }

  private __structureFadePropFromObject<T>(arg: IFadeArgumentObject<T>) {
    return {
      in: arg.in,
      out: arg.out,
    };
  }
}
