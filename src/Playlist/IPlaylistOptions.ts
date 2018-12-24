import {
  IFade,
} from '../Fade/IFade';
import {
  ISoundGroupIdentifier,
} from '../interfaces/ISoundGroupIdentifier';

export interface IPlaylistOptions {
  ids: Array<ISoundGroupIdentifier | string>;
  callback?(events: Event[]): any;
  fade?: IFade;
  loop?: boolean | number;
}
