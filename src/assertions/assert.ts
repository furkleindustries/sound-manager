export function assert(condition: any, message?: string) {
  const msg = message || 'A run-time assertion failed.';
  if (!Boolean(condition)) {
    throw new Error(msg);
  }

  return true;
}
