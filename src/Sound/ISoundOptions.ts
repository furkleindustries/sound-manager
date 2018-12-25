import {
  IFadeOptions,
} from '../Fade/IFadeOptions';

export interface ISoundOptions {
  getManagerVolume(): number;
  audioElement?: HTMLAudioElement;
  autoplay?: boolean;
  buffer?: AudioBuffer;
  context?: AudioContext;
  fade?: boolean | IFadeOptions;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
}
