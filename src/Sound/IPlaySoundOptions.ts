import {
  IFade,
} from '../Fade/IFade';

export interface IPlaySoundOptions {
  readonly fadeOnLoops: boolean;
  readonly fadeOverride?: IFade | null;
  readonly loopOverride?: boolean;
}
