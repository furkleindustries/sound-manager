import {
  createHtmlAudioSound,
} from './createHtmlAudioSound';
import {
  createWebAudioSound,
} from './createWebAudioSound';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  ICreateSoundOptions,
} from './ICreateSoundOptions';
import {
  ISound,
} from './ISound';

export const strings = {
  WEB_AUDIO_FAILED: 'Loading Web Audio failed. Falling back to HTML5 audio.',
  FALLBACK_WARNING:
    'Manager is not in Web Audio mode. Falling back to HTML5 Audio.',
  BOTH_FAILED: 'Generating HTML5 Audio failed too. Cannot construct Sound.',
  HTML_AUDIO_FAILED: 'Generating HTML5 Audio failed. Cannot construct Sound.',
};

export function createSound(options: ICreateSoundOptions): Promise<ISound> {
  const opts = getFrozenObject(options);
  const {
    isWebAudio,
  } = opts;

  if (isWebAudio) {
    return createWebHelper(opts);
  } else {
    console.warn(strings.FALLBACK_WARNING);
    return createHtmlHelper(opts);
  }
}

export function createWebHelper(options: ICreateSoundOptions): Promise<ISound> {
  const opts = getFrozenObject(options);
  return new Promise((resolve, reject) => (
    createWebAudioSound(opts).then(
      resolve,
      (err) => {
        console.warn(`${strings.WEB_AUDIO_FAILED}\n${err}`);
        createHtmlHelper(opts).then(
          resolve,
          (err) => reject(new Error(`${strings.BOTH_FAILED}\n${err}`)),
        );
      },
    )
  ));
}

export function createHtmlHelper(options: ICreateSoundOptions): Promise<ISound> {
  return new Promise((resolve, reject) => {
    console.warn(strings.FALLBACK_WARNING);
    createHtmlAudioSound(getFrozenObject(options)).then(
      resolve,
      (err) => reject(new Error(`${strings.HTML_AUDIO_FAILED}\n${err}`)),
    );
  });
}
