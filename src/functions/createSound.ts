import {
  createHtmlAudioSound,
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
import {
  loadAudioBuffer,
} from './loadAudioBuffer';

export const createSound = (
  url: string,
  options: ICreateSoundOptions,
): Promise<ISound> =>
{
  const {
    manager,
  } = options;

  const noManagerOpts = { ...options, };
  delete noManagerOpts.manager;

  const noContextOpts = { ...noManagerOpts, };
  delete noContextOpts.context;

  const getManagerVolume = () => manager.getVolume();

  return new Promise((resolve, reject) => {
    if (manager.isWebAudio()) {
      loadAudioBuffer(url, manager.getAudioContext()).then((buffer) => {
        return resolve(createWebAudioSound(
          getManagerVolume,
          {
            ...noManagerOpts,
            buffer,
          },
        ));
      }, (err) => {
        console.warn(err);
        console.warn('Loading Web Audio failed. Falling back to HTML5 audio.');

        try {
          return resolve(createHtmlAudioSound(
            url,
            getManagerVolume,
            noContextOpts,
          ));
        } catch (e) {
          console.error('HTML5 Audio failed too. Cannot construct Sound. ' +
                        'Error follows:');
          return reject(e);
        }
      });
    } else {
      console.log('Sound Manager is not in Web Audio mode. Falling back to ' +
                  'HTML5 Audio.');
      try {
        return resolve(createHtmlAudioSound(
          url,
          getManagerVolume,
          noContextOpts,
        ));
      } catch (e) {
        console.error('HTML5 Audio failed too. Cannot construct Sound. ' +
                      'Error follows:');
        return reject(e);
      }
    }
  });
};
