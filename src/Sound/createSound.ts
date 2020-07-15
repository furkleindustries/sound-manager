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
import { createHtmlAudioSound } from './createHtmlAudioSound';

export const strings = {
  OPTIONS_INVALID:
    'The options argument was not provided to createSound.',
};

export const createSound = (options: ICreateSoundOptions): Promise<ISound> => {
  assert(
    options,
    strings.OPTIONS_INVALID,
  );

  try {
    return createHtmlAudioSound(getFrozenObject(options));
  } catch (err) {
    throw new Error(`Error loading HTML Audio:\n\n\t${err}`);
  }
}
