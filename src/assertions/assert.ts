export function assert(condition: any, message?: string) {
  if (!Boolean(condition)) {
    throw new Error(message);
  }

  return true;
}
