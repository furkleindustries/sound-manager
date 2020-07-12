import {
  log,
} from 'colorful-logging';
import {
  IFade,
} from '../Fade/IFade';
import {
  IPlaylist,
} from './IPlaylist';
import {
  IPlaylistOptions,
} from './IPlaylistOptions';
import {
  ISoundGroupIdentifier,
} from '../interfaces/ISoundGroupIdentifier';
import {
  makeSoundGroupIdentifier,
} from '../functions/makeSoundGroupIdentifier';
import {
  assert,
} from 'ts-assertions';

export class Playlist implements IPlaylist {
  public readonly loop: boolean | number = false;
  public readonly ids: ReadonlyArray<ISoundGroupIdentifier>;
  public readonly fade: IFade | null = null;
  public readonly callback?: () => any;

  constructor(options: IPlaylistOptions) {
    assert(options);
    const {
      callback,
      fade,
      loop,
      ids,
    } = options;

    assert(Array.isArray(ids));
    assert(ids.length);
    this.ids = Object.freeze(ids.map(makeSoundGroupIdentifier));

    if (callback) {
      this.callback = callback;
    }

    if (fade) {
      this.fade = fade;
    }

    if (typeof loop === 'boolean') {
      this.loop = loop;
    }
  }

  public readonly loopIsValid = () => typeof this.loop === 'boolean';

  public readonly tryCallback = (name?: string) => {
    if (typeof this.callback === 'function') {
      log(
        `Firing playlist ${name ? name : '(no name provided)'} callback.`
      );

      this.callback();
    }
  };
}
