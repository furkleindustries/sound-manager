import {
  Fade,
} from './Fade';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  IFadeOptions,
} from './IFadeOptions';

export function createFade(options?: IFadeOptions) {
  return new Fade(getFrozenObject({ ...options }));
}
