import {
  assert,
} from '../assertions/assert';
import {
  createHtmlHelper,
} from './createHtmlHelper';
import {
  createWebHelper,
} from './createWebHelper';
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
  strings,
} from './strings';

export function createSound(options: ICreateSoundOptions): Promise<ISound> {
  assert(
    options,
    strings.CREATE_SOUND_OPTIONS_INVALID,
  );

  const opts = getFrozenObject(options);
  const {
    isWebAudio,
  } = opts;

  /* Default to web audio and require very explicit opt-out. */
  if (isWebAudio === false) {
    return createHtmlHelper(opts);
  } else {
    return createWebHelper(opts);
  }
}
