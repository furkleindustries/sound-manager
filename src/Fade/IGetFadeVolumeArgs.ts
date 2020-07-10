import {
  IFade,
} from './IFade';

export interface IGetFadeVolumeArgs {
  readonly duration: number;
  readonly fade: IFade;
  readonly loop: boolean;
  readonly targetVolume: number;
  readonly time: number;
  readonly fadeOnLoops?: boolean;
  readonly loopIterationCount?: number;
}
