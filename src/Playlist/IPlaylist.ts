import {
  IFade,
} from '../Fade/IFade';
import {
  ISoundGroupIdentifier,
} from '../interfaces/ISoundGroupIdentifier';

export interface IPlaylist {
  readonly loop: boolean | number;
  readonly ids: ISoundGroupIdentifier[];
  readonly fade?: IFade;
  callback?(events: Event[]): any;
}
