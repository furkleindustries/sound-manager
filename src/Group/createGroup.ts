import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  Group,
} from './Group';
import {
  IGroupOptions,
} from './IGroupOptions';

export const createGroup = (
  options: IGroupOptions,
) => new Group(getFrozenObject({ ...options }));
