export function shallowFlattenArray<T>(array: T[][]): T[] {
  return array.reduce((prev, curr) => prev.concat(curr));
}
