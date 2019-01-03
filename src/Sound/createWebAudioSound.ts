import {
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
import {
  loadAudioBuffer,
} from '../functions/loadAudioBuffer';
import {
  Sound,
} from './Sound';
import { assert } from '../assertions/assert';

export const createWebAudioSound = (options: ICreateSoundOptions) => {
  if (!options) {
    throw new Error();
  }

  const {
    url,
    manager,
  } = options;

  assert(url);
  assert(manager);
  return new Promise<Sound>((resolve, reject) => {
    loadAudioBuffer(url, manager.getAudioContext()).then((buffer) => (
      resolve(new Sound({
        ...options,
        buffer,
        getManagerVolume() {
          /* istanbul ignore next */
          return manager.getVolume();
        },
      }))
    ), reject);
  });
};
