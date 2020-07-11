import {
  IFade,
} from './IFade';
import {
  ISound,
} from '../Sound/ISound';
import {
  assertValid,
} from 'ts-assertions';

export const scheduleWebAudioFadeOut = ({
  __fadeOnLoops: fadeOnLoops,
  __startedTime: startingTime,
  getContextCurrentTime,
  getDuration,
  getFade,
  getFadeGainNode,
  getFadeVolume,
  getLoop,
}: ISound & {
  __fadeOnLoops: boolean;
  __startedTime: number;
}) => {
  const currentTime = getContextCurrentTime() / 1000;
  const duration = getDuration();
  const fade = assertValid<IFade>(getFade());
  const fadeGainNode = getFadeGainNode();
  const outLength = fade.length.out || 0;
  const loop = getLoop();

  for (let time = 0; time < outLength; time += 1) {
    fadeGainNode.gain.setValueAtTime(
      getFadeVolume({
        duration,
        fade,
        fadeOnLoops,
        loop,
        startingTime,
        time,
      }),

      currentTime + duration - time,
    );
  }
};
