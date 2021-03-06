import {
  IFade,
} from '../Fade/IFade';
import {
  ISoundGroupIdentifier,
} from '../interfaces/ISoundGroupIdentifier';

export interface IPlaylistOptions {
  ids: Array<ISoundGroupIdentifier | string>;
  callback?(): any;
  fade?: IFade;
  loop?: boolean | number;
}
