import {
  ICollection,
} from '../interfaces/ICollection';

export function getOne<T extends {}>(name: string, items: ICollection<T>): T {
  const item = items[name];
  if (!item) {
    throw new Error();
  }

  return item;
}
