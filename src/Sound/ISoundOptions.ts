import {
  IFadeOptions,
} from '../Fade/IFadeOptions';
import {
  INodeOptions,
} from '../Node/INodeOptions';
import {
  ITaggableNodeOptions,
} from '../Node/ITaggableNodeOptions';

export interface ISoundOptions extends INodeOptions, ITaggableNodeOptions {
  audioElement?: HTMLAudioElement;
  buffer?: AudioBuffer;
  fade?: boolean | IFadeOptions;
  isWebAudio?: boolean;
  loop?: boolean;
  trackPosition?: number;
  getManagerVolume?(): number;
}
