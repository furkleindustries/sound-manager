import {
  IFadeOptions,
} from '../Fade/IFadeOptions';
import {
  INodeOptions,
} from '../Node/INodeOptions';
import {
  ISoundLabel,
} from '../Node/ISoundLabel';
import {
  ITaggableNodeOptions,
} from '../Node/ITaggableNodeOptions';

export interface ISoundOptions extends INodeOptions, ITaggableNodeOptions {
  audioElement?: HTMLAudioElement;
  buffer?: AudioBuffer;
  fade?: boolean | IFadeOptions;
  label?: ISoundLabel;
  loop?: boolean;
  trackPosition?: number;
  getManagerVolume?(): number;
}
