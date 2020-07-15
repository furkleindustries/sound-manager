import {
  IFade,
} from '../Fade/IFade';
import {
  ISoundLabel,
} from '../Node/ISoundLabel';

export interface ICreateSoundOptions {
  url: string;
  getManagerVolume?(): number;
  fade?: IFade;
  fadeOnLoops?: boolean;
  label?: ISoundLabel;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
}
