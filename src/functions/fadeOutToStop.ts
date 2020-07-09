import {
  EasingCurves,
} from '../enums/EasingCurves';
import {
  IFade,
} from '../Fade/IFade';
import {
  ISound,
} from '../Sound/ISound';
import {
  getFadeValueAtTime,
} from './getFadeValueAtTime';
import {
  assertValid,
} from 'ts-assertions';

export const fadeOutToStop = ({
  getFade,
  getVolume,
  setVolume,
}: ISound) => {
  const fade = assertValid<IFade>(getFade());
  const volume = getVolume();
  const fadeCurve = fade.easingCurve.out || EasingCurves.Quadratic;
  const fadeLength = fade.length.out || 5000;

  return new Promise((resolve) => {
    const startTime = new Date().getTime();
    const timerId = setInterval(() => {
      const currentTime = new Date().getTime();
      if (currentTime >= startTime + fadeLength) {
        clearInterval(timerId);
        return resolve();
      } else {
        setVolume(getFadeValueAtTime({
          change: -volume,
          curve: fadeCurve,
          duration: fadeLength,
          initial: volume,
          time: startTime,
        }));
      }
    }, 1);
  });
};
