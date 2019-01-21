import {
  generateVolumeLevelVisualizerComponent,
  strings,
} from '../../src/Manager/generateVolumeLevelVisualizerComponent';

import {
  getVolumeLevelRenderListener,
} from '../../src/AnalysisSuite/getVolumeLevelRenderListener';
jest.mock('../../src/AnalysisSuite/getVolumeLevelRenderListener');

describe('generateVolumeLevelVisualizerComponent unit tests.', () => {
  beforeEach(() => {
    (getVolumeLevelRenderListener as any).mockClear();
  });

  it('Throws if the analysisSuite argument is not provided.', () => {
    expect(generateVolumeLevelVisualizerComponent).toThrow(strings.ANALYSIS_SUITE_INVALID);
  });

  it('Calls getVolumeLevelRenderListener and passes it a canvas.', () => {
    const sym = Symbol('return value');
    (getVolumeLevelRenderListener as any).mockReturnValue(sym);
    generateVolumeLevelVisualizerComponent({
      addRenderListener: jest.fn(),
    } as any);

    expect(getVolumeLevelRenderListener).toBeCalledTimes(1);
    expect((getVolumeLevelRenderListener as any).mock.calls[0][0]).toMatchObject(
      document.createElement('canvas')
    );
  });

  it('Passes the return value of getVolumeLevelRenderListener to analysisSuite.addRenderListener.', () => {
    const mock = jest.fn();
    const sym = Symbol('return value');
    (getVolumeLevelRenderListener as any).mockReturnValue(sym);
    generateVolumeLevelVisualizerComponent({
      addRenderListener: mock,
    } as any);

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(sym);
  });

  it('Returns a canvas element.', () => {
    const elem = generateVolumeLevelVisualizerComponent({
      addRenderListener: jest.fn(),
    } as any);

    expect(elem).toBeInstanceOf(HTMLCanvasElement);
  });
});
