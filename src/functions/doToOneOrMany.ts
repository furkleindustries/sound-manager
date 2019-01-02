import {
  assert,
} from '../assertions/assert';
import {
  ICollection,
} from '../interfaces/ICollection';

export function doToOneOrMany<T>(
  collection: ICollection<T>,
  propOrProps: string | string[],
  functionName: keyof T,
  ...args: any[]
)
{
  if (Array.isArray(propOrProps)) {
    propOrProps.forEach((name) => (
      doToOne(collection, name, functionName, ...args)
    ));
  } else {
    doToOne(collection, propOrProps, functionName, ...args);
  }
}

export function doToOne<T>(
  collection: ICollection<T>,
  propName: string,
  functionName: keyof T,
  ...args: any[]
)
{
  assert(typeof collection[propName][functionName] === 'function');
  (collection[propName][functionName] as any as Function)(...args);
}
