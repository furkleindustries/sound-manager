export function shallowFlattenArray(array: any[]) {
  return array.reduce((prev, curr) => prev.concat(curr));
}
