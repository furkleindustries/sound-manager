import {
  getVolumeLevelRenderListener,
} from '../AnalysisSuite/getVolumeLevelRenderListener';
import {
  IAnalysisSuite,
} from '../AnalysisSuite/IAnalysisSuite';
import {
  assert,
} from 'ts-assertions';

const strings = {
  ANALYSIS_SUITE_INVALID: 
    'The analysisSuite argument was not provided to ' +
    'generateVolumeLevelVisualizerComponent.',
};

export function generateVolumeLevelVisualizerComponent(analysisSuite: IAnalysisSuite) {
  assert(
    analysisSuite,
    strings.ANALYSIS_SUITE_INVALID,
  );

  const canvas = document.createElement('canvas');
  canvas.width = 150;
  canvas.height = 20;

  analysisSuite.addRenderListener(getVolumeLevelRenderListener(canvas));

  return canvas;
}
