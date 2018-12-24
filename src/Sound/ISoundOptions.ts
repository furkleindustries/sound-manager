import {
  IFade,
} from '../Fade/IFade';

export interface ISoundOptions {
  getManagerVolume(): number;
  audioElement?: HTMLAudioElement;
  autoplay?: boolean;
  buffer?: AudioBuffer;
  context?: AudioContext;
  fade?: IFade;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
}
