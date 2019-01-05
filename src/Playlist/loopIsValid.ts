export function loopIsValid(value: any): value is boolean | number {
  return (
    typeof value === 'boolean' || 
    (
      typeof value === 'number' &&
      value >= 1 &&
      value % 1 === 0
    )
  );
}