import {
  assert,
} from './assert';

export function assertValid<T>(
  value: any,
  message?: string | null,
  validator?: (arg: any) => boolean,
): T
{
  const isValid = validator || Boolean;
  assert(isValid(value), message);

  return value;
}
