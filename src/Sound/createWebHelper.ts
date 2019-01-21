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
  warn,
} from '../logging/warn';

export const strings = {
  BOTH_FAILED:
    'Generating HTML5 Audio failed too. Cannot construct Sound.',

  WEB_AUDIO_FAILED:
    'Loading Web Audio failed. Falling back to HTML5 audio.',
};

export async function createWebHelper(options: ICreateSoundOptions): Promise<ISound> {
  /* Try to create a sound in Web Audio mode. */
  try {
    return await createWebAudioSound(getFrozenObject(options));
  } catch (err) {
    /* Warn with generic and specific error messages that Web Audio mode has
     * failed, possibly due to CORS restrictions. */ 
    warn(`${strings.WEB_AUDIO_FAILED}\n${err}`);

    /* Try to create a sound in HTML Audio mode. */
    try {
      return await createHtmlHelper(getFrozenObject(options));
    } catch (err) {
      /* Throw after both modes have failed. */
      throw new Error(`${strings.BOTH_FAILED}\n${err}`);
    }
  }
}
