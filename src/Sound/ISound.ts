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
  setTrackPosition(seconds: number): ISound;
  getDuration(): number;
  isPlaying(): boolean;
  getLoop(): boolean;
  setLoop(doLoop: boolean): ISound;
  getFade(): IFade | null;
  setFade(fade: IFade | null): ISound;
  play(fadeOverride?: IFade | null): Promise<Event>;
  pause(): ISound;
  stop(): ISound;
  rewind(seconds: number): ISound;
  fastForward(seconds: number): ISound;
  getManagerVolume(): number;
  getGroupVolume(): number;
  getFadeVolume(): number;
  updateAudioElementVolume(): ISound;
  clearFadeState(): ISound;
  __startedTime: number;
  __promise: Promise<Event> | null;
  __audioElement: HTMLAudioElement | null;
  __rejectOnStop: () => void;
}
