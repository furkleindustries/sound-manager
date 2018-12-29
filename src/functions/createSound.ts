import {
  createHtmlAudioSoundObject,
} from './createHtmlAudioSoundObject';
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

  const optsClone = { ...options, };

  return new Promise((resolve, reject) => {
    if (manager.isWebAudio()) {
      createWebAudioSound(optsClone).then((sound) => {
        return resolve(sound);
      }, (err) => {
        console.warn(err);
        console.warn('Loading Web Audio failed. Falling back to HTML5 audio.');

        createHtmlAudioSoundObject(optsClone).then((sound) => {
          return resolve(sound);
        }, (err) => {
          return reject(new Error(
            'HTML5 Audio failed too. Cannot construct Sound. Error follows:' +
            '\n' + err
          ));
        });
      });
    } else {
      console.log('Sound Manager is not in Web Audio mode. Falling back to ' +
                  'HTML5 Audio.');
      createHtmlAudioSoundObject(optsClone).then((sound) => {
        return resolve(sound);
      }, (err) => {
        console.error();
        return reject(new Error(
          'HTML5 Audio failed too. Cannot construct Sound. Error follows:\n' +
          err
        ));
      });
    }
  });
};
