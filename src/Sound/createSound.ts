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
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
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
  assert(options);
  const {
    manager,
  } = options;

  assert(manager);

  const optsClone = { ...options, };
  const optsNoContext = { ...optsClone, };
  delete optsNoContext.context;
  return new Promise((resolve, reject) => {
    if (manager.isWebAudio()) {
      createWebAudioSound(optsClone).then(
        (sound) => resolve(sound),
        (err) => {
          console.warn(`${strings.WEB_AUDIO_FAILED}\n${err}`);
          createHtmlAudioSound(optsNoContext).then(
            (sound) => resolve(sound),
            (err) => reject(new Error(`${strings.BOTH_FAILED}\n${err}`))
          );
        });
    } else {
      console.warn(strings.FALLBACK_WARNING);
      createHtmlAudioSound(optsNoContext).then(
        (sound) => resolve(sound),
        (err) => reject(new Error(`${strings.HTML_AUDIO_FAILED}\n${err}`))
      );
    }
  });
};
