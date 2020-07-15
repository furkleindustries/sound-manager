export interface ISoundControllerState {
  duration: number;
  isPlaying: boolean;
  loop: boolean;
  trackPosition: number;
  volume: number;
  durationId: string;
  loopId: string;
  volumeId: string;
  timerId: any;
}