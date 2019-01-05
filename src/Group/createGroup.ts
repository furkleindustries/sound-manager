import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  Group,
} from './Group';
import {
  IGroupOptions,
} from './IGroupOptions';

export function createGroup(options?: IGroupOptions) {
  return new Group(getFrozenObject({ ...options }));
}
