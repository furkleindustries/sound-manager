import {
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
import {
  loadAudioBuffer,
} from './loadAudioBuffer';
import {
  Sound,
} from '../Sound/Sound';

export const createWebAudioSound = (options: ICreateSoundOptions) => {
  if (!options) {
    throw new Error();
  }

  const {
    url,
    manager,
  } = options;

  if (!url) {
    throw new Error();
  } else if (!manager) {
    throw new Error();
  }

  return new Promise<Sound>((resolve, reject) => {
    loadAudioBuffer(url, manager.getAudioContext()).then((buffer) => {
      return resolve(new Sound({
        ...options,
        buffer,
        getManagerVolume() {
          /* istanbul ignore next */
          return manager.getVolume();
        },
      }));
    }, (err) => {
      return reject(err);
    });
  });
};
