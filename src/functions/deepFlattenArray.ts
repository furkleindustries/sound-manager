export function deepFlattenArray(array: any[]): any[] {
  return array.reduce((prev, curr) => {
    if (Array.isArray(curr)) {
      return prev.concat(deepFlattenArray(curr));
    } else {
      return prev.concat(curr);
    }
  });
}
