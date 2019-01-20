import {
  doToOne,
} from './doToOne';
import {
  ICollection,
} from '../interfaces/ICollection';

export function doToMany<T>(
  collection: ICollection<T>,
  propNames: string[],
  functionName: keyof T,
  ...args: any[]
)
{
  propNames.forEach((name) => doToOne(collection, name, functionName, ...args));
}
