import {
  EasingCurves,
} from '../enums/EasingCurves';
import {
  ISound,
} from '../Sound/ISound';
import {
  getFadeValueAtTime,
} from './getFadeValueAtTime';

export const fadeOutToStop = ({
  getFade,
  getVolume,
  setVolume,
}: ISound) => {
  const fade = getFade() || {
    easingCurve: {
      in: EasingCurves.Quadratic,
      out: EasingCurves.Quadratic,
    },

    length: {
      in: 5000,
      out: 3500,
    },
  };

  const volume = getVolume();
  const fadeCurve = fade.easingCurve.out || EasingCurves.Quadratic;
  const fadeLength = fade.length.out || 3500;

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
