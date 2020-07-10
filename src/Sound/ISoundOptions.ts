import {
  IFadeOptions,
} from '../Fade/IFadeOptions';
import {
  INodeOptions,
} from '../Node/INodeOptions';
import {
  ITaggableNodeOptions,
} from '../Node/ITaggableNodeOptions';
import {
  IPanelRegisterableNodeOptions,
} from '../Node/IPanelRegisterableNodeOptions';

export interface ISoundOptions
  extends
    INodeOptions,
    ITaggableNodeOptions,
    IPanelRegisterableNodeOptions
{
  audioElement?: HTMLAudioElement;
  buffer?: AudioBuffer;
  fade?: boolean | IFadeOptions;
  loop?: boolean;
  trackPosition?: number;
  getManagerVolume?(): number;
}
