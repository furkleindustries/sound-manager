import {
  assert,
} from './assert';

export function assertType<T>(
  value: any,
  validator: (arg: any) => boolean,
): T
{
  assert(validator(value));
  return value;
}
