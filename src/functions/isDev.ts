let memoizedValue: boolean;
export function isDev() {
  if (typeof memoizedValue === 'undefined') {
    memoizedValue = Boolean(
      process &&
      process.env &&
      process.env.NODE_ENV === 'development'
    );
  }

  return memoizedValue;
}
