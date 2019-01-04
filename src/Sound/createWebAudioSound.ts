import {
  assert,
} from '../assertions/assert';
import {
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
import {
  loadAudioBuffer,
} from '../functions/loadAudioBuffer';
import {
  Sound,
} from './Sound';
import { assertValid } from '../assertions/assertValid';

export const createWebAudioSound = (options: ICreateSoundOptions) => {
  const {
    url,
    manager,
  } = assertValid<ICreateSoundOptions>(options);

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
