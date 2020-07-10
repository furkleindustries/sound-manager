import {
  IFade,
} from '../Fade/IFade';
import {
  ISound,
} from './ISound';

export interface IPlaySoundOptions {
  readonly doneCallback: () => ISound;
  readonly fadeOnLoops: boolean;
  readonly fadeOverride: IFade | null;
  readonly loopOverride: boolean;
}
