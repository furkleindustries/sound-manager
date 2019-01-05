import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  IFade,
} from '../Fade/IFade';
import {
  ISound,
} from './ISound';

export function setPerPlaySoundOverrides(
  sound: ISound,
  fadeOverride?: IFade | null,
  loopOverride?: boolean,
)
{
  if (fadeOverride) {
    sound.__fadeOverride = getFrozenObject({ ...fadeOverride, });
  }

  if (typeof loopOverride === 'boolean') {
    sound.__loopOverride = loopOverride;
  }
}