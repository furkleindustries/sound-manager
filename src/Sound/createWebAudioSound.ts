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
    url,
    manager,
  } = assertValid<ICreateSoundOptions>(options);

  assert(url);
  assert(manager);
  return new Promise<Sound>((resolve, reject) => {
    loadAudioBuffer(url, manager.getAudioContext()).then((buffer) => (
      resolve(new Sound(getFrozenObject({
        ...options,
        buffer,
        getManagerVolume() {
          /* istanbul ignore next */
          return manager.getVolume();
        },
      })))
    ), reject);
  });
};
