export interface IAudioNode {
  getVolume(): number;
  setVolume(value: number): this;
  isWebAudio(): boolean;
}
