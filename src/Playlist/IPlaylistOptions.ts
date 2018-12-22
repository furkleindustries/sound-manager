import {
  IFade,
} from '../Fade/IFade';

export interface IPlaylistOptions {
  soundNames: string[];
  groupName?: string;
  fade?: IFade;
  loop?: boolean | number;
}
