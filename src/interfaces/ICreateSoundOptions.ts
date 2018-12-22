import {
  ISoundManager,
} from '../SoundManager/ISoundManager';

export interface ICreateSoundOptions {
  manager: ISoundManager;
  url: string;
  audioElement?: HTMLAudioElement;
  autoplay?: boolean;
  context?: AudioContext;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
}
