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
  IManagerStateCallback,
} from '../interfaces/IManagerStateCallback';
import {
  IPanelRegisterableNode,
} from '../Node/IPanelRegisterableNode';
import {
  ITaggableNode,
} from '../Node/ITaggableNode';
import {
  NodeTypes,
} from '../enums/NodeTypes';

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
  play(fadeOverride?: IFade | null, loopOverride?: boolean | number): Promise<void>;
  pause(): this;
  stop(): Promise<void>;
  rewind(seconds: number): this;
  fastForward(seconds: number): this;
  getGroupVolume(): number;
  getFadeVolume(): number;
  updateAudioElementVolume(): this;
  registerStateCallback(callback: IManagerStateCallback): void;
  unregisterStateCallback(callback: IManagerStateCallback): void;
  callStateCallbacks(): void;
}
