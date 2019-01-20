import {
  assertValid,
} from '../assertions/assertValid';
import {
  IAnalysableNode,
} from '../Node/IAnalysableNode';
import {
  IAnalysis,
} from '../AnalysisSuite/IAnalysis';
import {
  IAnalysisSuite,
} from '../AnalysisSuite/IAnalysisSuite';
import {
  INode,
} from '../Node/INode';

export function generateVolumeLevelsVisualizerComponent(node: INode & IAnalysableNode) {
  const canvas = document.createElement('canvas');
  canvas.width = 150;
  canvas.height = 20;
  const canvasCtx = assertValid<CanvasRenderingContext2D>(
    canvas.getContext('2d'),
  );

  const analysisSuite = assertValid<IAnalysisSuite>(node.analysis);
  let arr: Uint8Array;
  analysisSuite.addRenderListener((analysis: IAnalysis) => {
    if (!arr) {
      arr = new Uint8Array(analysis.getBinCount());
    }

    analysis.getTimeDomainByte(arr);
    const tAverage = arr.reduce((prev, curr) => prev + Math.abs(128 - curr)) /
      arr.length / 128;

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = 'rgb(255, 0, 0)';
    canvasCtx.fillRect(
      0,
      canvas.height * (1 - tAverage),
      canvas.width,
      canvas.height,
    );
  });

  return canvas;
}
