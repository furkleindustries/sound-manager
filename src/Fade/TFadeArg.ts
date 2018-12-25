import {
  IFadeArgumentObject,
} from './IFadeArgumentObject';

export type TFadeArg<T> = T | [ T, T ] | IFadeArgumentObject<T>;
