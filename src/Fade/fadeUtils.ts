import {
  assert,
} from '../assertions/assert';
import {
  IFadeProperty,
} from './IFadeProperty';
import {
  TFadeArg,
} from './TFadeArg';

export function fadeArgumentToFadeProperty<T>(arg: TFadeArg<T>, defaultValue: T | null, validator: (arg: T) => boolean): IFadeProperty<T> {
  const {
    valids,
    value,
  } = argToPropHelper(arg, validator);

  assert(valids[0] || valids[1]);

  return normalizeFadeProp(value, valids, defaultValue);
}

export function argToPropHelper<T>(
  arg: TFadeArg<T>,
  validator: (arg: T) => boolean
): { valids: [ boolean, boolean ], value: IFadeProperty<T>, }
{
  if (validatorWrapper<T>(arg, validator)) {
    return {
      valids: [ true, true ],
      value: structureFadePropFromValue(arg),
    };
  } else if (Array.isArray(arg)) {
    if (arg.length === 2) {
      return {
        valids: [
          validatorWrapper(arg[0], validator),
          validatorWrapper(arg[1], validator),
        ],

        value: structureFadePropFromArray(arg),
      };
    }
  } else if (typeof arg === 'object') {
    return {
      valids: [
        validatorWrapper(arg.in, validator),
        validatorWrapper(arg.out, validator),
      ],

      value: structureFadePropFromObject(arg),
    };
  }

  throw new Error();
}

export function validatorWrapper<T>(arg: any, validator: (arg: any) => boolean): arg is T {
  return arg === null || validator(arg);
}

export function structureFadePropFromValue<T>(arg: T) {
  return {
    in: arg,
    out: arg,
  };
}

export function structureFadePropFromArray<T>(arg: [ T, T ]) {
  return {
    in: arg[0],
    out: arg[1],
  };
}

export function structureFadePropFromObject<T>(arg: IFadeProperty<T>) {
  return {
    in: arg.in,
    out: arg.out,
  };
}

export function normalizeFadeProp<T>(
  arg: IFadeProperty<any>,
  valids: [ boolean, boolean ],
  defaultValue: T | null,
): IFadeProperty<T>
{
  return {
    in: valids[0] ? arg.in : defaultValue,
    out: valids[1] ? arg.out : defaultValue,
  };
}