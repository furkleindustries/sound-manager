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
  getContextCurrentTime,
  getDuration,
  getFade,
  getFadeGainNode,
  getFadeVolume,
  getLoop,
}: ISound) => {
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
        loop,
        time,
      }),

      currentTime + duration - time,
    );
  }
};
