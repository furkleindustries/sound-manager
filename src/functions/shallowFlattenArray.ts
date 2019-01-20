export function shallowFlattenArray<T>(array: Array<T | T[]>): T[] {
  return array.reduce<T[]>((prev, curr) => prev.concat(curr), []);
}
