import {
  IFade,
} from './IFade';

export interface IGetFadeVolumeArgs {
  readonly duration: number;
  readonly fade: IFade;
  readonly targetVolume: number;
  readonly time: number;
  readonly iterationCount?: number;
  readonly fadeOnLoops?: boolean;
}
