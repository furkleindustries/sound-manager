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
  options?: ISoundOptions,
): Promise<ISound | HTMLAudioElement> =>
{
  const opts = options || {};

  const {
    context,
  } = opts;

  return new Promise<ISound | HTMLAudioElement>((resolve, reject) => {
    if (context) {
      loadAudioBuffer(url, context).then((buffer) => {
        return resolve(new Sound({
          buffer,
          ...options,
        }));
      }, (err) => {
        console.warn('Loading Web Audio failed. Falling back to HTML5 audio.');
        console.warn(err);
        try {
          return resolve(new Sound({
            audioElement: new Audio(url),
            ...options,
          }));
        } catch (e) {
          console.error('HTML5 Audio failed too. Cannot construct Sound.');
          return reject(e);
        }
      });
    }
  });
};
