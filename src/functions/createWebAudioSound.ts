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
  const {
    url,
    manager,
  } = options;

  return new Promise<Sound>((resolve, reject) => {
    loadAudioBuffer(url, manager.getAudioContext()).then((buffer) => {
      return resolve(new Sound({
        ...options,
        buffer,
        getManagerVolume: () => manager.getVolume(),
      }));
    }, (err) => {
      return reject(err);
    });
  });
};
