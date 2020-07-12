import {
  IFade,
} from '../Fade/IFade';
import {
  INodeOptions,
} from '../Node/INodeOptions';
import {
  IPanelRegisterableNodeOptions,
} from '../Node/IPanelRegisterableNodeOptions';
import {
  ITaggableNodeOptions,
} from '../Node/ITaggableNodeOptions';

export interface ISoundOptions
  extends
    INodeOptions,
    ITaggableNodeOptions,
    IPanelRegisterableNodeOptions
{
  audioElement?: HTMLAudioElement;
  buffer?: AudioBuffer;
  fade?: IFade;
  fadeOnLoops?: boolean;
  loop?: boolean;
  trackPosition?: number;
  getManagerVolume?(): number;
}
