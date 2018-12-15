export interface ISoundOptions {
  buffer: AudioBuffer;
  context: AudioContext;
  autoplay?: boolean;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
}
