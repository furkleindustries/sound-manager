import {
  IFade,
} from '../Fade/IFade';
import {
  ISoundLabel,
} from '../Node/ISoundLabel';

// Must have buffer+context or an url.
export interface ICreateSoundOptions {
  getManagerVolume?(): number;
  buffer?: AudioBuffer;
  context?: AudioContext;
  fade?: IFade;
  fadeOnLoops?: boolean;
  isWebAudio?: boolean;
  label?: ISoundLabel;
  loop?: boolean;
  trackPosition?: number;
  url?: string;
  volume?: number;
}
