import {
  IWebAudioNode,
} from '../interfaces/IWebAudioNode';

export interface ISound extends IWebAudioNode {
  getTrackPosition(): number;
  getPlaying(): boolean;
  getLoop(): boolean;
  setLoop(doLoop: boolean): ISound;
  getSourceNode(): AudioBufferSourceNode;
  getContextCurrentTime(): number;
  setTrackPosition(seconds: number): ISound;
  play(): ISound;
  pause(): ISound;
  stop(): ISound;
  rewind(seconds: number): ISound;
  fastForward(seconds: number): ISound;
}
