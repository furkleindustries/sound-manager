import {
  IFade,
} from '../../Fade/IFade';
import {
  IFadeOptions,
} from '../../Fade/IFadeOptions';
import {
  IGroup,
} from '../../Group/IGroup';
import {
  IGroupOptions,
} from '../../Group/IGroupOptions';
import {
  IManagerCreateSoundOptions,
} from '../../interfaces/IManagerCreateSoundOptions';
import {
  IPlaylist,
} from '../../Playlist/IPlaylist';
import {
  IPlaylistOptions,
} from '../../Playlist/IPlaylistOptions';
import {
  ISound,
} from '../../Sound/ISound';

export interface IFactorySubmanager {
  createGroup(options?: IGroupOptions): IGroup;
  createSound(options: IManagerCreateSoundOptions): Promise<ISound>;
  createPlaylist(options: IPlaylistOptions): IPlaylist;
  createFade(options?: IFadeOptions): IFade;
}
