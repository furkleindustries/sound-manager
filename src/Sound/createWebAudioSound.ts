import {
  assert,
} from '../assertions/assert';
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
  Sound,
} from './Sound';

export const createWebAudioSound = (options: ICreateSoundOptions) => {
  const {
    context,
    getManagerVolume,
    url,
  } = assertValid<ICreateSoundOptions>(options);

  assert(url);
  return new Promise<Sound>((resolve, reject) => {
    loadAudioBuffer(url, assertValid<AudioContext>(context)).then((buffer) => (
      resolve(new Sound(getFrozenObject({
        ...options,
        buffer,
        getManagerVolume: assertValid<() => number>(getManagerVolume),
      })))
    ), reject);
  });
};
