import {
  assert,
  assertValid,
} from 'ts-assertions';
import {
  ICollection,
} from '../interfaces/ICollection';

export const strings = {
  COLLECTION_INVALID:
    'The collection argument was not provided to doToOne.',

  COLLECTION_PROP_NAME_INVALID:
    'The collection argument did not have a property matching the propName ' +
    'argument.',

  FUNCTION_INVALID:
    'The function computed through the first three arguments to doToOne was ' +
    'invalid or not present.',

  FUNCTION_NAME_INVALID:
    'The functionName argument was not provided to doToOne.',
 
  PROP_NAME_INVALID:
    'The propName argument was not provided to doToOne.',
};

export function doToOne<T, U extends keyof T>(
  collection: ICollection<T>,
  propName: string,
  functionName: U,
  ...args: any[]
)
{
  assert(
    collection,
    strings.COLLECTION_INVALID,
  );

  assert(
    propName,
    strings.PROP_NAME_INVALID,
  );

  assert(
    functionName,
    strings.FUNCTION_NAME_INVALID,
  );

  assert(
    collection[propName],
    strings.COLLECTION_PROP_NAME_INVALID,
  );

  assertValid<Function>(
    collection[propName][functionName],
    strings.FUNCTION_INVALID,
    (value) => typeof value === 'function',
  )(...args);
}
