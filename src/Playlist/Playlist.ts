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
  readonly soundGroupIdentifiers: ISoundGroupIdentifier[];
  readonly fade?: IFade;

  constructor(options?: IPlaylistOptions) {
    const opts: Partial<IPlaylistOptions> = options || {};
    const {
      fade,
      loop,
      soundGroupIdentifiers,
    } = opts;

    if (!Array.isArray(soundGroupIdentifiers)) {
      throw new Error();
    } else if (soundGroupIdentifiers.length === 0) {
      throw new Error();
    }

    const soundGroupIds = soundGroupIdentifiers.map((sgi) => {
      if (typeof sgi === 'string') {
        const split = sgi.split('.');
        if (!split.length) {
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

    this.soundGroupIdentifiers = soundGroupIds;

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
