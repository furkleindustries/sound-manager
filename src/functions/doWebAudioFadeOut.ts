import {
  IFade,
} from '../Fade/IFade';

export function doWebAudioFadeOut({
  duration,
  fade,
  fadeGainNode,
  getContextCurrentTime,
  getFadeVolume,
}: {
  duration: number,
  fade: IFade,
  fadeGainNode: GainNode,
  getContextCurrentTime: () => number,
  getFadeVolume: () => number,
}) {
  const outLength = Number(fade.length.out);
  for (let ii = 0; ii < outLength * 20; ii += 1) {
    const time = ii / 20;
    fadeGainNode.gain.setValueAtTime(
      getFadeVolume(),
      getContextCurrentTime() + duration - time,
    );
  }
}