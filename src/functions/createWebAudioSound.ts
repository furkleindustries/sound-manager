import {
  ICreateWebAudioSoundOptions,
} from '../interfaces/ICreateWebAudioSoundOptions';
import {
  Sound,
} from '../Sound/Sound';

export const createWebAudioSound = (
  getManagerVolume: () => number,
  options: ICreateWebAudioSoundOptions,
) =>
{
  return new Sound({
    ...options,
    getManagerVolume,
  });
};
