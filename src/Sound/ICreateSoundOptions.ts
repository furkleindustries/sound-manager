import {
  IFadeOptions,
} from '../Fade/IFadeOptions';

export interface ICreateSoundOptions {
  context?: AudioContext;
  isWebAudio: boolean;
  // Must have buffer or url.
  buffer?: AudioBuffer;
  url?: string;
  fade?: IFadeOptions | boolean;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
  getManagerVolume?(): number;
}
