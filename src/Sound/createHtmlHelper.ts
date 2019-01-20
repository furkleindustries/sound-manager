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

export async function createHtmlHelper(options: ICreateSoundOptions): Promise<ISound> {
  try {
    return await createHtmlAudioSound(getFrozenObject(options));
  } catch (err) {
    throw new Error(`${strings.CREATE_SOUND_HTML_AUDIO_FAILED}\n${err}`);
  }
}
