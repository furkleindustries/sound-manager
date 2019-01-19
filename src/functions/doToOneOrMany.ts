import {
  doToMany,
} from './doToMany';
import {
  doToOne,
} from './doToOne';
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
    doToMany(collection, propOrProps, functionName, ...args);
  } else {
    doToOne(collection, propOrProps, functionName, ...args);
  }
}
