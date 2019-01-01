import {
  getOne,
} from './getOne';
import {
  ICollection,
} from '../interfaces/ICollection';

export function getOneOrMany<T extends {}>(
  name: string,
  nodes: ICollection<T>,
): T;
export function getOneOrMany<T>(
  names: string[],
  nodes: ICollection<T>,
): T[];
export function getOneOrMany<T>(
  nameOrNames: string | string[],
  nodes: ICollection<T>,
): T | T[]
{
  if (typeof nameOrNames === 'string') {
    return getOne(nameOrNames, nodes);
  } else if (Array.isArray(nameOrNames)) {
      return nameOrNames.map((name) => getOne(name, nodes));
    }

    throw new Error();
}
