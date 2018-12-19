import {
  IFade,
} from '../Fade/IFade';

export interface IPlaylist {
  soundNames: string[];
  fade: IFade;
  loop: boolean | number;
}
