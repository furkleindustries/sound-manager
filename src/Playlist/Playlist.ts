import {
  assert,
} from '../assertions/assert';
import {
  Fade,
} from '../Fade/Fade';
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

export class Playlist implements IPlaylist {
  readonly loop: boolean | number = false;
  readonly ids: ISoundGroupIdentifier[];
  readonly fade: IFade | null = null;
  readonly callback?: (events: Event[]) => any;

  constructor(options: IPlaylistOptions) {
    const {
      callback,
      fade,
      loop,
      ids,
    } = options;

    assert(Array.isArray(ids));
    assert(ids.length);
    const soundGroupIds = ids.map((sgi) => {
      /* Allow 'groupName.soundName' strings and coerce them to
       * ISoundGroupIdentifiers. Also interpret 'soundName' as
       * 'default.soundName'. */
      if (typeof sgi === 'string') {
        const split = sgi.split('.');
        if (split.length === 1) {
          return {
            groupName: 'default',
            soundName: split[0],
          };
        }

        return {
          groupName: split[0],
          soundName: split[1],
        };
      }

      return sgi;
    });

    this.ids = soundGroupIds;

    if (callback) {
      this.callback = callback;
    }

    if (fade) {
      if (typeof fade === 'boolean') {
        this.fade = new Fade();
      } else if (fade.easingCurve && fade.length) {
        this.fade = fade as IFade;
      } else {
        this.fade = new Fade(fade);
      }
    }

    if (typeof loop === 'boolean' ||
        (typeof loop === 'number' && loop >= 1 && loop % 1 === 0))
    {
      this.loop = loop;
    }
  }

  public loopIsValid() {
    return (
      typeof this.loop === 'number' &&
      this.loop >= 1 &&
      this.loop % 1 === 0
    );
  }
}
