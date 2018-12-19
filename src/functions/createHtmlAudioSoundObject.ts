import {
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
import {
  Sound,
} from '../Sound/Sound';

export const createHtmlAudioSound = (
  url: string,
  getManagerVolume: () => number,
  options: ICreateSoundOptions,
) =>
{
  const audioElement = new Audio(url);
  audioElement.preload = 'auto';

  return new Sound({
    ...options,
    audioElement,
    getManagerVolume,
  });
};
