import {
  IFade,
} from './IFade';

export interface IGetFadeVolumeArgs {
  readonly duration: number;
  readonly fade: IFade;
  readonly loop: boolean;
  readonly time: number;
  readonly fadeOnLoops?: boolean;
  readonly loopIterationCount?: number;
}
