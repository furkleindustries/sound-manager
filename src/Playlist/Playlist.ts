import {
  IFade,
} from '../Fade/IFade';
import {
  IPlaylist,
} from './IPlaylist';
import {
  IPlaylistOptions,
} from './IPlaylistOptions';

export class Playlist implements IPlaylist {
  readonly loop: boolean | number = false;
  readonly groupName: string = 'default';
  readonly soundNames: string[];
  readonly fade?: IFade;

  constructor(options?: IPlaylistOptions) {
    const opts: Partial<IPlaylistOptions> = options || {};
    const {
      groupName,
      loop,
      soundNames,
      fade,
    } = opts;

    if (!Array.isArray(soundNames)) {
      throw new Error();
    } else if (soundNames.length === 0) {
      throw new Error();
    }

    this.soundNames = soundNames;

    if (groupName) {
      this.groupName = groupName;
    }

    if (typeof loop === 'boolean' ||
        (typeof loop === 'number' && loop >= 1 && loop % 1 === 0))
    {
      this.loop = loop;
    }

    if (fade) {
      this.fade = fade;
    }
  }
}
