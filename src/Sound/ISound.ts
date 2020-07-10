import {
  IAnalysableNode,
} from '../Node/IAnalysableNode';
import {
  IBaseNode,
} from '../Node/IBaseNode';
import {
  IFade,
} from '../Fade/IFade';
import {
  IPanelRegisterableNode,
} from '../Node/IPanelRegisterableNode';
import {
  IPlaySoundOptions,
} from './IPlaySoundOptions';
import {
  ITaggableNode,
} from '../Node/ITaggableNode';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import { IGetFadeVolumeArgs } from '../Fade/IGetFadeVolumeArgs';

export interface ISound
  extends
    IBaseNode,
    IAnalysableNode,
    IPanelRegisterableNode,
    ITaggableNode
{
  readonly type: NodeTypes.Sound;
  getSourceNode(): AudioBufferSourceNode;
  getFadeGainNode(): GainNode;
  getContextCurrentTime(): number;
  getTrackPosition(): number;
  setTrackPosition(seconds: number): this;
  getDuration(): number;
  isPlaying(): boolean;
  getLoop(): boolean;
  setLoop(loop: boolean): this;
  getFade(): IFade | null;
  setFade(fade: IFade | null): this;
  play(options?: Partial<IPlaySoundOptions>): Promise<void>;
  pause(): this;
  stop(): Promise<void>;
  rewind(seconds: number): this;
  fastForward(seconds: number): this;
  getGroupVolume(): number;
  getFadeVolume(options?: Partial<IGetFadeVolumeArgs>): number;
  updateAudioElementVolume(): this;
}
