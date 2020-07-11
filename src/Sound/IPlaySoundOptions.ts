import {
  IFade,
} from '../Fade/IFade';
import {
  ISound,
} from './ISound';

export interface IPlaySoundOptions {
  readonly fadeOnLoops: boolean;
  readonly doneCallback?: () => ISound;
  readonly fadeOverride?: IFade | null;
  readonly loopOverride?: boolean;
}
