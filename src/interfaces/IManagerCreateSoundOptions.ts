import {
  IFadeOptions,
} from '../Fade/IFadeOptions';

export interface IManagerCreateSoundOptions {
  url: string;
  autoplay?: boolean;
  context?: AudioContext;
  fade?: IFadeOptions | boolean;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
}
