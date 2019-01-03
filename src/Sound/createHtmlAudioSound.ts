import {
  assert,
} from '../assertions/assert';
import {
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
import {
  Sound,
} from '../Sound/Sound';

export const createHtmlAudioSound = (options: ICreateSoundOptions) => {
  assert(options);

  const {
    manager,
    url,
  } = options;

  assert(manager);
  assert(url);

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
