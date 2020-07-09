import {
  IFadeProperty,
} from './IFadeProperty';
import {
  TFadeArg,
} from './TFadeArg';
import {
  assert,
} from 'ts-assertions';

export const fadeArgumentToFadeProperty = <T>(
  arg: TFadeArg<T>,
  defaultValue: T | null,
  validator: (arg: T) => boolean,
): IFadeProperty<T> => {
  const {
    valids,
    value,
  } = argToPropHelper(arg, validator);

  assert(valids[0] || valids[1]);

  return normalizeFadeProp(value, valids, defaultValue);
};

export const argToPropHelper = <T>(
  arg: TFadeArg<T>,
  validator: (arg: T) => boolean
): {
  valids: [ boolean, boolean ],
  value: IFadeProperty<T>,
} => {
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
};

export const validatorWrapper = <T>(
  arg: any,
  validator: (arg: any) => boolean,
): arg is T => arg === null || validator(arg);

export const structureFadePropFromValue = <T>(arg: T) => ({
  in: arg,
  out: arg,
});

export const structureFadePropFromArray = <T>(arg: [ T, T ]) => ({
  in: arg[0],
  out: arg[1],
});

export const structureFadePropFromObject = <T>(arg: IFadeProperty<T>) => ({
  in: arg.in,
  out: arg.out,
});

export const normalizeFadeProp = <T>(
  arg: IFadeProperty<any>,
  valids: [ boolean, boolean ],
  defaultValue: T | null,
): IFadeProperty<T> => ({
  in: valids[0] ? arg.in : defaultValue,
  out: valids[1] ? arg.out : defaultValue,
});
