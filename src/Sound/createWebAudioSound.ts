import {
  assertValid,
} from '../assertions/assertValid';
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
  strings,
} from '../../src/Sound/strings';

export async function createWebAudioSound(options: ICreateSoundOptions): Promise<ISound> {
  const {
    context,
    url,
  } = assertValid<ICreateSoundOptions>(
    options,
    strings.CREATE_WEB_AUDIO_SOUND_OPTIONS_INVALID,
  );

  const safeContext = assertValid<AudioContext>(
    context,
    strings.CREATE_WEB_AUDIO_SOUND_CONTEXT_INVALID,
  );
  
  const safeUrl = assertValid<string>(
    url,
    strings.CREATE_WEB_AUDIO_SOUND_URL_INVALID,
  );

  const buffer = await loadAudioBuffer(safeUrl, safeContext);

  return new Sound(getFrozenObject({
    ...options,
    buffer,
  }));
};
