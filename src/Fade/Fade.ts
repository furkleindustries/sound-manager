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
      );
    }
  }

  private __argToProp<T>(arg: TFadeArg<T>, defaultValue: T | null, validator: (arg: T) => boolean): IFadeArgumentObject<T> {
    const {
      valids,
      value,
    } = this.__argToPropHelper(arg, validator);

    if (!valids[0] && !valids[1]) {
      throw new Error();
    }

    return this.__normalizeFadeProp(value, valids, defaultValue);
  }

  private __argToPropHelper<T>(
    arg: TFadeArg<T>,
    validator: (arg: T) => boolean
  ): { valids: [ boolean, boolean ], value: IFadeArgumentObject<T>, }
  {
    if (this.__validatorWrapper<T>(arg, validator)) {
      return {
        valids: [ true, true ],
        value: this.__structureFadePropFromValue(arg),
      };
    } else if (Array.isArray(arg)) {
      if (arg.length === 2) {
        return {
          valids: [
            this.__validatorWrapper(arg[0], validator),
            this.__validatorWrapper(arg[1], validator),
          ],

          value: this.__structureFadePropFromArray(arg),
        };
      }
    } else if (typeof arg === 'object') {
      return {
        valids: [
          this.__validatorWrapper(arg.in, validator),
          this.__validatorWrapper(arg.out, validator),
        ],

        value: this.__structureFadePropFromObject(arg),
      };
    }

    throw new Error();
  }

  private __validatorWrapper<T>(arg: any, validator: (arg: any) => boolean): arg is T {
    return arg === null || validator(arg);
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

  private __normalizeFadeProp<T>(
    arg: IFadeArgumentObject<any>,
    valids: [ boolean, boolean ],
    defaultValue: T | null,
  ): IFadeArgumentObject<T>
  {
    return {
      in: valids[0] ? arg.in : defaultValue,
      out: valids[1] ? arg.out : defaultValue,
    };
  }
}
