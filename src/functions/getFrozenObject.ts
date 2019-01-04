export function getFrozenObject<T extends object>(...sources: T[]): T {
  return Object.freeze(Object.assign({}, ...sources));
}
