import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  ICreateSoundOptions,
} from './ICreateSoundOptions';
import {
  loadAudioBuffer,
} from '../functions/loadAudioBuffer';
import {
  ISound,
} from './ISound';
import {
  Sound,
} from './Sound';
import {
  assertValid,
} from 'ts-assertions';

export const strings = {
  CONTEXT_INVALID:
    'The context property of the argument object was not provided to ' +
    'createWebAudioSound.',

  OPTIONS_INVALID:
    'The options argument was not provided to createWebAudioSound.',

  URL_INVALID:
    'The url property of the argument object was not provided to ' +
    'createWebAudioSound.',
};

export async function createWebAudioSound(options: ICreateSoundOptions): Promise<ISound> {
  const {
    context,
    url,
  } = assertValid<ICreateSoundOptions>(
    options,
    strings.OPTIONS_INVALID,
  );

  const safeContext = assertValid<AudioContext>(
    context,
    strings.CONTEXT_INVALID,
  );
  
  const safeUrl = assertValid<string>(
    url,
    strings.URL_INVALID,
  );

  const buffer = await loadAudioBuffer(safeUrl, safeContext);

  return new Sound(getFrozenObject({
    ...options,
    buffer,
  }));
};
