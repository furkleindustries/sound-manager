import {
  IFadeOptions,
} from '../Fade/IFadeOptions';
import {
  IManager,
} from '../Manager/IManager';

export interface ICreateSoundOptions {
  manager: IManager;
  url: string;
  audioElement?: HTMLAudioElement;
  autoplay?: boolean;
  context?: AudioContext;
  fade?: IFadeOptions | boolean;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
}
