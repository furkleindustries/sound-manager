import {
  ISound,
} from '../Sound/ISound';
import {
  loadAudioBuffer,
} from './loadAudioBuffer';
import {
  Sound,
} from '../Sound/Sound';
import { ISoundOptions } from '../Sound/ISoundOptions';

export const createSoundObject = (
  url: string,
  context: AudioContext,
  options?: ISoundOptions,
): Promise<ISound> =>
{
  return new Promise((resolve, reject) => {
    loadAudioBuffer(url, context).then((buffer) => {
      return resolve(new Sound({
        buffer,
        context,
        ...options,
      }));
    }, (err) => {
      return reject(err);
    })
  });
};
