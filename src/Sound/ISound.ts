import {
  EasingCurves,
} from '../Fade/EasingCurves';
import {
  IFade,
} from '../Fade/IFade';
import {
  IPanelRegisterableNode,
} from '../interfaces/IPanelRegisterableNode';
import {
  IWebAudioNode,
} from '../interfaces/IWebAudioNode';

export interface ISound extends IWebAudioNode, IPanelRegisterableNode {
  getSourceNode(): AudioBufferSourceNode;
  getContextCurrentTime(): number;
  getTrackPosition(): number;
  setTrackPosition(seconds: number): ISound;
  getDuration(): number;
  getPlaying(): boolean;
  getLoop(): boolean;
  setLoop(doLoop: boolean): ISound;
  getFade(): IFade | null;
  setFade(options: IFade | null): ISound;
  play(fadeOverride?: IFade): Promise<Event>;
  pause(): ISound;
  stop(): ISound;
  rewind(seconds: number): ISound;
  fastForward(seconds: number): ISound;
  getManagerVolume(): number;
  getGroupVolume(): number;
  getFadeVolume(): number;
  updateAudioElementVolume(): ISound;
  getFadeValueAtTime(time: number, length: number, curve: EasingCurves): number;
}
