export interface IAudioNode {
  getVolume(): number;
  setVolume(value: number): IAudioNode;
  isWebAudio(): boolean;
}
