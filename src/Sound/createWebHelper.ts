import {
  createHtmlHelper,
} from './createHtmlHelper';
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
import {
  strings,
} from './strings';
import {
  warn,
} from '../logging/warn';

export function createWebHelper(options: ICreateSoundOptions): Promise<ISound> {
  const opts = getFrozenObject(options);
  console.log('wtf dude');
  return new Promise((resolve, reject) => (
    createWebAudioSound(opts).then(
      resolve,
      (err) => {
        warn(`${strings.CREATE_SOUND_WEB_AUDIO_FAILED}\n${err}`);
        createHtmlHelper(opts).then(
          resolve,
          (err) => reject(`${strings.CREATE_SOUND_BOTH_FAILED}\n${err}`),
        );
      },
    )
  ));
}
