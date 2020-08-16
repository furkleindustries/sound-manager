import {
  createHtmlAudioSound,
} from './createHtmlAudioSound';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  ICreateSoundOptions,
} from './ICreateSoundOptions';
import {
  ISound,
} from './ISound';
import {
  assert,
} from 'ts-assertions';

export const strings = {
  OPTIONS_INVALID:
    'The options argument was not provided to createSound.',
};

export const createSound = (
  options: ICreateSoundOptions,
  isPreloading = false,
): Promise<ISound> => {
  assert(
    options,
    strings.OPTIONS_INVALID,
  );

  const preloadStrategy: keyof GlobalEventHandlersEventMap = isPreloading ?
    'canplay' :
    'loadedmetadata';

  try {
    return createHtmlAudioSound(getFrozenObject(options), preloadStrategy);
  } catch (err) {
    throw new Error(`Error loading HTML Audio:\n\n\t${err}`);
  }
}
