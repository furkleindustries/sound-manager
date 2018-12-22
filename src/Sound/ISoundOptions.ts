export interface ISoundOptions {
  getManagerVolume(): number;
  audioElement?: HTMLAudioElement;
  autoplay?: boolean;
  buffer?: AudioBuffer;
  context?: AudioContext;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
}
