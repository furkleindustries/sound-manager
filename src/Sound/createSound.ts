import {
  assert,
} from '../assertions/assert';
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

export const createSound = (options: ICreateSoundOptions): Promise<ISound> => {
  const optsClone = { ...options };
  const {
    manager,
  } = optsClone;

  assert(manager);

  if (manager.isWebAudio()) {
    return createWebHelper(getFrozenObject(optsClone));
  } else {
    console.warn(strings.FALLBACK_WARNING);
    return createHtmlHelper(getFrozenObject(optsClone));
  }
};

export function createWebHelper(options: ICreateSoundOptions): Promise<ISound> {
  return new Promise((resolve, reject) => {
    createWebAudioSound(options).then(
      resolve,
      (err) => {
        console.warn(`${strings.WEB_AUDIO_FAILED}\n${err}`);
        createHtmlAudioSound(getFrozenObject(options)).then(
          resolve,
          (err) => reject(new Error(`${strings.BOTH_FAILED}\n${err}`)),
        );
      },
    );
  });
}

export function createHtmlHelper(options: ICreateSoundOptions): Promise<ISound> {
  const optsClone = { ...options, };
  const optsNoContext = { ...optsClone, };
  return new Promise((resolve, reject) => {
    console.warn(strings.FALLBACK_WARNING);
    createHtmlAudioSound(optsNoContext).then(
      resolve,
      (err) => reject(new Error(`${strings.HTML_AUDIO_FAILED}\n${err}`)),
    );
  });
}
