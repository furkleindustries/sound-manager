import {
  createFade,
} from '../Fade/createFade';
import {
  IFadeOptions,
} from '../Fade/IFadeOptions';
import {
  ISound,
} from './ISound';

export function trySetSoundFade(
  sound: ISound,
  value?: IFadeOptions | boolean,
)
{
  if (value) {
    const fade = typeof value === 'boolean' ? createFade() : createFade(value);
    sound.setFade(fade);
  }
}
