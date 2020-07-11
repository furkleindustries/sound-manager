import {
  IFade,
} from './IFade';

export interface IGetFadeVolumeArgs {
  readonly duration: number;
  readonly fade: IFade | null;
  readonly isStopping: boolean;
  readonly loop: boolean;
  readonly startingTime: number;
  readonly time: number;
  readonly fadeOnLoops?: boolean;
  readonly loopIterationCount?: number;
}
