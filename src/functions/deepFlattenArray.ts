export function deepFlattenArray(array: any[]): any[] {
  return array.reduce((prev: any[], curr) => {
    if (Array.isArray(curr)) {
      return prev.concat(deepFlattenArray(curr));
    }

    return prev.concat(curr);
  }, []);
}
