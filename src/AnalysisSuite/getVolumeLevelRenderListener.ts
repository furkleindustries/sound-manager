import {
  drawVolumeLevel,
} from '../functions/drawVolumeLevel';
import {
  IAnalysis,
} from './IAnalysis';
import {
  IAnalysisRenderCallback,
} from './IAnalysisRenderCallback';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export const strings = {
  CANVAS_CONTEXT_2D_INVALID:
    'The canvas provided to getVolumeLevelRenderListener did not produce a ' +
    'valid 2D context.',

  CANVAS_INVALID:
    'The canvas argument was not provided to getVolumeLevelRenderListener.',
};

export function getVolumeLevelRenderListener(
  canvas: HTMLCanvasElement,
  color?: string,
): IAnalysisRenderCallback
{
  assert(canvas, strings.CANVAS_INVALID);

  const canvasCtx = assertValid<CanvasRenderingContext2D>(
    canvas.getContext('2d'),
    strings.CANVAS_CONTEXT_2D_INVALID,
  );

  let arr: Uint8Array;
  return (analysis: IAnalysis) => {
    if (!arr) {
      arr = new Uint8Array(analysis.getBinCount());
    }
  
    analysis.getTimeDomainByte(arr);
    const average = arr.reduce((prev, curr) => (
      prev + Math.abs(128 - curr)
    )) / arr.length / 128;

    drawVolumeLevel({
      color,
      ctx: canvasCtx,
      width: canvas.width,
      height: canvas.height,
      value: average,
    });
  };
}