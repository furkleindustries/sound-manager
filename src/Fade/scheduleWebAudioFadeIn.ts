import {
  IFade,
} from './IFade';
import {
  ISound,
} from '../Sound/ISound';
import {
  assertValid,
} from 'ts-assertions';

export const scheduleWebAudioFadeIn = ({
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
  const inLength = fade.length.in || 0;
  const loop = getLoop();

  for (let time = 0; time <= inLength; time += 1) {
    fadeGainNode.gain.setValueAtTime(
      getFadeVolume({
        duration,
        fade,
        loop,
        time,
      }),

      currentTime + time,
    );
  }
};
