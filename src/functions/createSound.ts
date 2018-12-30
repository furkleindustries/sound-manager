import {
  createHtmlAudioSound as createHtmlAudioSound,
} from './createHtmlAudioSound';
import {
  createWebAudioSound,
} from './createWebAudioSound';
import {
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
import {
  ISound,
} from '../Sound/ISound';

export const createSound = (options: ICreateSoundOptions): Promise<ISound> => {
  if (!options) {
    throw new Error();
  }

  const {
    manager,
  } = options;

  if (!manager) {
    throw new Error();
  }

  const optsClone = { ...options, };

  return new Promise((resolve, reject) => {
    if (manager.isWebAudio()) {
      createWebAudioSound(optsClone).then((sound) => {
        return resolve(sound);
      }, (err) => {
        console.warn(err);
        console.warn('Loading Web Audio failed. Falling back to HTML5 audio.');

        createHtmlAudioSound(optsClone).then((sound) => {
          return resolve(sound);
        }, (err) => {
          return reject(new Error(
            'HTML5 Audio failed too. Cannot construct Sound. Error follows:' +
            '\n' + err
          ));
        });
      });
    } else {
      console.log('Manager is not in Web Audio mode. Falling back to HTML5 ' +
                  'Audio.');
      createHtmlAudioSound(optsClone).then((sound) => {
        return resolve(sound);
      }, (err) => {
        return reject(new Error(
          'HTML5 Audio failed too. Cannot construct Sound. Error follows:\n' +
          err
        ));
      });
    }
  });
};
