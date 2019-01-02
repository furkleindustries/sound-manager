import {
  assertNodeIsHtmlAudio,
} from '../assertions/assertNodeIsHtmlAudio';
import {
  IAudioNode,
} from '../interfaces/IAudioNode';

export function requiresHtmlAudio(
  target: IAudioNode,
  propertyKey: string,
)
{
  /* Don't do any assertions if the object hasn't been fully constructed
   * yet. */
  if (!Object.keys(target).length) {
    return;
  }

  assertNodeIsHtmlAudio(target, propertyKey);
}
