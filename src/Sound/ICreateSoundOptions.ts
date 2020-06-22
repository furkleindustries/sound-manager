import {
  IFadeOptions,
} from '../Fade/IFadeOptions';

export interface ICreateSoundOptions {
  isWebAudio: boolean;
  // Must have buffer or url.
  buffer?: AudioBuffer;
  url?: string;
  context?: AudioContext;
  fade?: IFadeOptions | boolean;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
  getManagerVolume?(): number;
}
