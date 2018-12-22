import {
  IFade,
} from '../Fade/IFade';

export interface IPlaylist {
  readonly groupName: string;
  readonly loop: boolean | number;
  readonly soundNames: string[];
  readonly fade?: IFade;
}
