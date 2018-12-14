export interface ISound {
  readonly sourceNode: AudioBufferSourceNode;
  readonly gainNode: GainNode;
  readonly volume: number;
  getVolume(): number;
  setVolume(value: number): ISound;
}
