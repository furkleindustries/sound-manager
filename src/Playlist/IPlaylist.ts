import {
  IFade,
} from '../Fade/IFade';
import {
  ISoundGroupIdentifier,
} from '../interfaces/ISoundGroupIdentifier';

export interface IPlaylist {
  readonly fade: IFade | null;
  readonly loop: boolean | number;
  readonly ids: ISoundGroupIdentifier[];
  callback?(events: Event[]): any;
}
