import {
  IFade,
} from '../Fade/IFade';

export function doWebAudioFadeIn({
  fade,
  fadeGainNode,
  getFadeVolume,
  getContextCurrentTime,
}: {
  fade: IFade,
  fadeGainNode: GainNode,
  getFadeVolume: () => number,
  getContextCurrentTime: () => number,
})
{
  const inLength = Number(fade.length.in);
  for (let ii = 0; ii <= inLength * 20; ii += 1) {
    const time = ii / 20;
    fadeGainNode.gain.setValueAtTime(
      getFadeVolume(),
      getContextCurrentTime() + time,
    );
  }
}
