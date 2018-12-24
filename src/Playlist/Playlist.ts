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
  readonly fade?: IFade;
  readonly callback?: (events: Event[]) => any;

  constructor(options?: IPlaylistOptions) {
    const opts: Partial<IPlaylistOptions> = options || {};
    const {
      callback,
      fade,
      loop,
      ids,
    } = opts;

    if (!Array.isArray(ids)) {
      throw new Error();
    } else if (ids.length === 0) {
      throw new Error();
    }

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
      this.fade = fade;
    }

    if (typeof loop === 'boolean' ||
        (typeof loop === 'number' && loop >= 1 && loop % 1 === 0))
    {
      this.loop = loop;
    }
  }
}
