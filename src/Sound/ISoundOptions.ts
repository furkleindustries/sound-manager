export interface ISoundOptions {
  audioElement?: HTMLAudioElement;
  buffer?: AudioBuffer;
  context?: AudioContext;
  autoplay?: boolean;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
}
