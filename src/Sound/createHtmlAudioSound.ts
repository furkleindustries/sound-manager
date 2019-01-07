import {
  assert,
} from '../assertions/assert';
import {
  assertValid,
} from '../assertions/assertValid';
import {
  ICreateSoundOptions,
} from './ICreateSoundOptions';
import {
  Sound,
} from '../Sound/Sound';

export const createHtmlAudioSound = (options: ICreateSoundOptions) => {
  assert(options);

  const {
    getManagerVolume,
    url,
  } = options;

  assert(getManagerVolume);
  assert(url);

  const audioElement = new Audio(url);
  audioElement.preload = 'auto';

  return Promise.resolve(new Sound({
    ...options,
    audioElement,
    getManagerVolume: assertValid<() => number>(getManagerVolume),
  }));
};
