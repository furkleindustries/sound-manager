import {
  IFade,
} from '../Fade/IFade';
import {
  ISoundGroupIdentifier,
} from '../interfaces/ISoundGroupIdentifier';

export interface IPlaylistOptions {
  soundGroupIdentifiers: Array<ISoundGroupIdentifier | string>;
  fade?: IFade;
  loop?: boolean | number;
}
