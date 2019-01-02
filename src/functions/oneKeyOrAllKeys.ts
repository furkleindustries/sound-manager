import {
  ICollection,
} from '../interfaces/ICollection';

export function nameOrAllKeys<T>(
  name: string | null | undefined,
  collection: ICollection<T>,
)
{
  return name || Object.keys(collection);
}
