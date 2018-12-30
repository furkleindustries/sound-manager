import {
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
import {
  Sound,
} from '../Sound/Sound';

export const createHtmlAudioSound = (options: ICreateSoundOptions) => {
  const {
    manager,
    url,
  } = options;

  const audioElement = new Audio(url);
  audioElement.preload = 'auto';

  return Promise.resolve(new Sound({
    ...options,
    audioElement,
    getManagerVolume() {
      /* istanbul ignore next */
      return manager.getVolume();
    },
  }));
};
