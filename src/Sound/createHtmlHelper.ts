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

export const strings = {
  HTML_AUDIO_FAILED:
    'Generating HTML5 Audio failed. Cannot construct Sound.',
};

export function createHtmlHelper(options: ICreateSoundOptions): Promise<ISound> {
  try {
    return createHtmlAudioSound(getFrozenObject(options));
  } catch (err) {
    throw new Error(`${strings.HTML_AUDIO_FAILED}\n${err}`);
  }
}
