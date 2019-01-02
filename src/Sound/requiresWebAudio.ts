import {
  assertNodeIsWebAudio,
} from '../assertions/assertNodeIsWebAudio';

export function requiresWebAudio(
  target: any,
  propertyKey: string,
)
{
  /* Don't do any assertions if the object hasn't been fully constructed
   * yet. */
  if (!Object.keys(target).length) {
    return;
  }

  assertNodeIsWebAudio(target, propertyKey);
}
