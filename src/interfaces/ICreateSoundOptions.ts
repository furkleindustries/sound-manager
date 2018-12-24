import {
  IManager,
} from '../Manager/IManager';

export interface ICreateSoundOptions {
  manager: IManager;
  url: string;
  audioElement?: HTMLAudioElement;
  autoplay?: boolean;
  context?: AudioContext;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
}
