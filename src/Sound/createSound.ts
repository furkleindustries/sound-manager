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

export const createSound = (options: ICreateSoundOptions): Promise<ISound> => {
  assert(options);

  const {
    manager,
  } = options;

  assert(manager);

  const optsClone = { ...options, };

  return new Promise((resolve, reject) => {
    if (manager.isWebAudio()) {
      createWebAudioSound(optsClone).then((sound) => (
        resolve(sound)
      ), (err) => {
        console.warn(err);
        console.warn('Loading Web Audio failed. Falling back to HTML5 audio.');

        delete optsClone.context;
        createHtmlAudioSound(optsClone).then((sound) => (
          resolve(sound)
        ), (err) => (
          reject(new Error(
            'HTML5 Audio failed too. Cannot construct Sound. Error follows:' +
            '\n' + err
          ))
        ));
      });
    } else {
      console.log('Manager is not in Web Audio mode. Falling back to HTML5 ' +
                  'Audio.');

      delete optsClone.context;
      createHtmlAudioSound(optsClone).then((sound) => (
        resolve(sound)
      ), (err) => (
        reject(new Error(
          'HTML5 Audio failed too. Cannot construct Sound. Error follows:\n' +
          err
        ))
      ));
    }
  });
};
