export interface ISound {
  readonly sourceNode: AudioBufferSourceNode;
  readonly gainNode: GainNode;
  readonly volume: number;
  readonly loop: boolean;
  readonly trackPosition: number;
  readonly playing: boolean;
  getContextCurrentTime: () => number;
  setVolume(value: number): ISound;
  setLoop(doLoop: boolean): ISound;
  setTrackPosition(seconds: number): ISound;
  play(): ISound;
  pause(): ISound;
  stop(): ISound;
  rewind(seconds: number): ISound;
  fastForward(seconds: number): ISound;
}
