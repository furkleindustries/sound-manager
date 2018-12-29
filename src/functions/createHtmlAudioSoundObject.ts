import {
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
import {
  Sound,
} from '../Sound/Sound';

export const createHtmlAudioSoundObject = (options: ICreateSoundOptions) => {
  const {
    manager,
    url,
  } = options;

  const audioElement = new Audio(url);
  audioElement.preload = 'auto';

  return Promise.resolve(new Sound({
    ...options,
    getManagerVolume: () => manager.getVolume(),
    audioElement,
  }));
};
