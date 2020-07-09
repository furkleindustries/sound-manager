import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  ICreateSoundOptions,
} from './ICreateSoundOptions';
import {
  ISound,
} from './ISound';
import {
  Sound,
} from './Sound';
import {
  assertValid,
} from 'ts-assertions';

export const strings = {
  GET_MANAGER_VOLUME_INVALID:
    'The getManagerVolume argument property was not provided to ' +
    'createHtmlAudioSound.',

  OPTIONS_INVALID:
    'The options argument was not provided to createHtmlAudioSound.',

  URL_INVALID:
    'The url argument property was not provided to createHtmlAudioSound.',
};

export const createHtmlAudioSound = (options: ICreateSoundOptions): Promise<ISound> => {
  const {
    buffer,
    context,
    fade,
    getManagerVolume: getManagerVol,
    isWebAudio,
    loop,
    trackPosition,
    url,
    volume,
  } = assertValid<ICreateSoundOptions>(
    options,
    strings.OPTIONS_INVALID,
  );

  const safeUrl = assertValid<string>(
    url,
    strings.URL_INVALID,
  );

  const audioElement = new Audio(safeUrl);
  audioElement.preload = 'auto';

  const getManagerVolume = assertValid<() => number>(
    getManagerVol,
    strings.GET_MANAGER_VOLUME_INVALID,
  );

  const sound = new Sound(getFrozenObject({
    ...options,
    buffer,
    audioElement,
    fade,
    getManagerVolume,
    isWebAudio,
    context,
    loop,
    trackPosition,
    volume,
  }));

  const playthroughListener = (resolver: (sound: ISound) => void) => {
    resolver(sound);
  };

  const errorListener = (rejector: (err: Error) => void, { error }: ErrorEvent) => {
    rejector(error);
  };

  return new Promise((resolve, reject) => {
    const boundPlayListener = playthroughListener.bind(null, resolve);
    const boundErrListener = errorListener.bind(null, reject);
    audioElement.addEventListener(
      'canplaythrough',
      boundPlayListener,
    );

    audioElement.addEventListener(
      'error',
      boundErrListener,
    );
  });
};
