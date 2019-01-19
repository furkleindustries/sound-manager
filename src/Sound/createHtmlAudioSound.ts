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
  ISound,
} from './ISound';
import {
  Sound,
} from '../Sound/Sound';
import {
  strings,
} from './strings';

export async function createHtmlAudioSound(options: ICreateSoundOptions): Promise<ISound> {
  const {
    getManagerVolume,
    url,
  } = assertValid<ICreateSoundOptions>(
    options,
    strings.CREATE_HTML_AUDIO_SOUND_OPTIONS_INVALID,
  );

  const safeUrl = assertValid<string>(
    url,
    strings.CREATE_HTML_AUDIO_SOUND_URL_INVALID,
  );

  const audioElement = new Audio(safeUrl);
  audioElement.preload = 'auto';

  const safeGetManagerVolume = assertValid<() => number>(
    getManagerVolume,
    strings.CREATE_HTML_AUDIO_SOUND_GET_MANAGER_VOLUME_INVALID,
  );

  return new Sound(getFrozenObject({
    ...options,
    audioElement,
    getManagerVolume: safeGetManagerVolume,
  }));
};
