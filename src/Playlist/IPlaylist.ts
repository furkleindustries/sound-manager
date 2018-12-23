import {
  IFade,
} from '../Fade/IFade';
import {
  ISoundGroupIdentifier,
} from '../interfaces/ISoundGroupIdentifier';

export interface IPlaylist {
  readonly loop: boolean | number;
  readonly soundGroupIdentifiers: ISoundGroupIdentifier[];
  readonly fade?: IFade;
}
