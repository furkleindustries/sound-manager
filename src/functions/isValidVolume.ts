export function isValidVolume(value: any): value is number {
  return typeof value === 'number' && value >= 0 && value <= 1;
}
