import {
  IFade,
} from '../Fade/IFade';
import {
  IPanelRegisterableNode,
} from '../Node/IPanelRegisterableNode';
import {
  IManagerNode,
} from '../Node/IManagerNode';

export interface ISound extends IManagerNode, IPanelRegisterableNode {
  getSourceNode(): AudioBufferSourceNode;
  getFadeGainNode(): GainNode;
  getOutputNode(): GainNode;
  getContextCurrentTime(): number;
  getTrackPosition(): number;
  setTrackPosition(seconds: number): this;
  getDuration(): number;
  isPlaying(): boolean;
  getLoop(): boolean;
  setLoop(doLoop: boolean): this;
  getFade(): IFade | null;
  setFade(fade: IFade | null): this;
  play(fadeOverride?: IFade | null): Promise<Event>;
  pause(): this;
  stop(): this;
  rewind(seconds: number): this;
  fastForward(seconds: number): this;
  getManagerVolume(): number;
  getGroupVolume(): number;
  getFadeVolume(): number;
  updateAudioElementVolume(): this;
  clearFadeState(): this;
  __startedTime: number;
  __promise: Promise<Event> | null;
  __audioElement: HTMLAudioElement | null;
  __rejectOnStop: () => void;
}
