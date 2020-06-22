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
  BUFFER_INVALID:
    'The buffer argument was provided, but was out of band.',

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
    buffer,
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

  let safeUrl: string;
  let safeBuffer: AudioBuffer;

  if (url !== undefined) {
    safeUrl = assertValid<string>(
      url,
      strings.URL_INVALID,
    );

    safeBuffer = await loadAudioBuffer(safeUrl, safeContext);
  } else if (buffer !== undefined) {
    safeBuffer = assertValid(await context?.decodeAudioData(
      assertValid<Buffer>(
        buffer,
        strings.BUFFER_INVALID,
      ),
    ));
  } else {
    throw new Error('Neither an url or buffer argument was provided to createWebAudioSound.');
  }

  return new Sound(getFrozenObject({
    ...options,
    buffer: safeBuffer,
  }));
};
