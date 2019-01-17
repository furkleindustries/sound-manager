import {
  createHtmlAudioSound,
} from './createHtmlAudioSound';
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

export function createHtmlHelper(options: ICreateSoundOptions): Promise<ISound> {
  return new Promise((resolve, reject) => (
    createHtmlAudioSound(getFrozenObject(options)).then(
      resolve,
      (err) => reject(`${strings.CREATE_SOUND_HTML_AUDIO_FAILED}\n${err}`),
    )
  ));
}