import {
  createHtmlHelper,
} from './createHtmlHelper';
import {
  createWebHelper,
} from './createWebHelper';
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
  assert,
} from 'ts-assertions';
import { IManagerStateCallback } from '../interfaces/IManagerStateCallback';

export const strings = {
  OPTIONS_INVALID:
    'The options argument was not provided to createSound.',
};

export function createSound(
  options: ICreateSoundOptions,
  registerStateCallback: (cb: IManagerStateCallback) => void,
  unregisterStateCallback: (cb: IManagerStateCallback) => void,
  callStateCallbacks: () => void,
): Promise<ISound> {
  assert(
    options,
    strings.OPTIONS_INVALID,
  );

  const opts = getFrozenObject(options);

  /* Default to web audio and require very explicit opt-out. */
  if (opts.isWebAudio === false) {
    return createHtmlHelper(
      opts,
      registerStateCallback,
      unregisterStateCallback,
      callStateCallbacks,
    );
  } else {
    return createWebHelper(
      opts,
      registerStateCallback,
      unregisterStateCallback,
      callStateCallbacks,
    );
  }
}
