import {
  ISound,
} from '../Sound/ISound';
import {
  ISoundOptions,
} from '../Sound/ISoundOptions';
import {
  loadAudioBuffer,
} from './loadAudioBuffer';
import {
  Sound,
} from '../Sound/Sound';

export const createSoundObject = (
  url: string,
  options: ISoundOptions,
): Promise<ISound | HTMLAudioElement> =>
{
  if (!options) {
    throw new Error();
  }

  const {
    context,
  } = options;

  return new Promise<ISound | HTMLAudioElement>((resolve, reject) => {
    if (context) {
      loadAudioBuffer(url, context).then((buffer) => {
        return resolve(new Sound({
          buffer,
          ...options,
        }));
      }, () => {
        try {
          return resolve(new Audio(url));
        } catch (e) {
          return reject(e);
        }
      });
    }
  });
};
