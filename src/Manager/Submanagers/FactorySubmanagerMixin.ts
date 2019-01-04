import {
  IConstructor,
} from '../../interfaces/IConstructor';
import {
  IFactorySubmanager,
} from './IFactorySubmanager';
import {
  IManagerNode,
} from '../../Node/IManagerNode';
import { IGroupOptions } from '../../Group/IGroupOptions';
import { Group } from '../../Group/Group';
import { getFrozenObject } from '../../functions/getFrozenObject';
import { IFadeOptions } from '../../Fade/IFadeOptions';
import { Fade } from '../../Fade/Fade';
import { IPlaylistOptions } from '../../Playlist/IPlaylistOptions';
import { Playlist } from '../../Playlist/Playlist';
import { IManagerCreateSoundOptions } from '../../interfaces/IManagerCreateSoundOptions';
import { ISound } from '../../Sound/ISound';
import { createSound } from '../../Sound/createSound';

export function FactorySubmanagerMixin<T extends IConstructor<IManagerNode>>(Base: T) {
  return class FactorySubmanagerMixin extends Base implements IFactorySubmanager {
    public createGroup(options?: IGroupOptions) {
      const opts = options || {};
      if (this.isWebAudio()) {
        opts.context = this.getAudioContext();
      }

      return new Group(getFrozenObject(opts));
    }

    public createFade(options?: IFadeOptions) {
      const opts = options || {};
      return new Fade(getFrozenObject(opts));
    }

    public createPlaylist(options: IPlaylistOptions) {
      const opts = options || {};
      return new Playlist({ ...opts, });
    }

    public createSound(options: IManagerCreateSoundOptions): Promise<ISound> {
      if (this.isWebAudio()) {
        return createSound({
          ...options,
          context: this.getAudioContext(),
          manager: this,
        });
      } else {
        return createSound({
          ...options,
          manager: this,
        });
      }
    }
  };
}
