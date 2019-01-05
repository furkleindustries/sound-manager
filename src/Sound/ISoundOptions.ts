import {
  IFadeOptions,
} from '../Fade/IFadeOptions';

export interface ISoundOptions {
  getManagerVolume(): number;
  audioElement?: HTMLAudioElement;
  buffer?: AudioBuffer;
  context?: AudioContext;
  fade?: boolean | IFadeOptions;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
}
