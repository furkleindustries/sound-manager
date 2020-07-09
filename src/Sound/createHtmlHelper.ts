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
  IManagerStateCallback,
} from '../interfaces/IManagerStateCallback';
import {
  ISound,
} from './ISound';

export const strings = {
  HTML_AUDIO_FAILED:
    'Generating HTML5 Audio failed. Cannot construct Sound.',
};

export function createHtmlHelper(
  options: ICreateSoundOptions,
  registerStateCallback: (callback: IManagerStateCallback) => void,
  unregisterStateCallback: (callback: IManagerStateCallback) => void,
  callStateCallbacks: () => void,
): Promise<ISound> {
  try {
    return createHtmlAudioSound(
      getFrozenObject(options),
      registerStateCallback,
      unregisterStateCallback,
      callStateCallbacks,
    );
  } catch (err) {
    throw new Error(`${strings.HTML_AUDIO_FAILED}\n${err}`);
  }
}
