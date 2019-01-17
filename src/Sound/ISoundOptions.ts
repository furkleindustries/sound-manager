import {
  IFadeOptions,
} from '../Fade/IFadeOptions';
import {
  IManagerNodeOptions,
} from '../Node/IManagerNodeOptions';

export interface ISoundOptions extends IManagerNodeOptions {
  audioElement?: HTMLAudioElement;
  buffer?: AudioBuffer;
  context?: AudioContext;
  fade?: boolean | IFadeOptions;
  loop?: boolean;
  tags?: string[];
  trackPosition?: number;
  getManagerVolume?(): number;
}
