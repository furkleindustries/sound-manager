export const isValidVolume = (value: any): value is number => (
  typeof value === 'number' && value >= 0 && value <= 1
);
