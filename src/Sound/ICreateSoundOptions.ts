import {
  IFadeOptions,
} from '../Fade/IFadeOptions';
import {
  ISoundLabel,
} from '../Node/ISoundLabel';

export interface ICreateSoundOptions {
  context?: AudioContext;
  isWebAudio: boolean;
  // Must have buffer or url.
  buffer?: AudioBuffer;
  url?: string;
  fade?: IFadeOptions | boolean;
  label?: ISoundLabel;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
  getManagerVolume?(): number;
}
