import {
  IFade,
} from './IFade';

export interface IGetFadeVolumeArgs {
  readonly fade: IFade;
  readonly trackPosition: number;
  readonly duration: number;
  readonly targetVolume: number;
  readonly iterationCount?: number;
  readonly fadeOnLoops?: boolean;
}
