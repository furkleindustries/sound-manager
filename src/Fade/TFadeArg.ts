import {
  IFadeProperty,
} from './IFadeProperty';

export type TFadeArg<T> = T | [ T, T ] | IFadeProperty<T>;
