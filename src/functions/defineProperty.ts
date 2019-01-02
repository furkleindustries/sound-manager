export function defineProperty<T extends object>(
  object: T,
  propName: string | number | symbol,
  value: any,
  options?: object,
): void
{
  Object.defineProperty(object, propName, {
    ...options,
    value,
  });
}
