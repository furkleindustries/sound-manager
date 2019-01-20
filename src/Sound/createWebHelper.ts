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

export async function createWebHelper(options: ICreateSoundOptions): Promise<ISound> {
  try {
    return await createWebAudioSound(getFrozenObject(options));
  } catch (err) {
    warn(`${strings.CREATE_SOUND_WEB_AUDIO_FAILED}\n${err}`);

    try {
      return await createHtmlHelper(getFrozenObject(options));
    } catch (err) {
      throw new Error(`${strings.CREATE_SOUND_BOTH_FAILED}\n${err}`);
    }
  }
}
