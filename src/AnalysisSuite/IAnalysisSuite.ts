import {
  IAnalysis,
} from './IAnalysis';
import {
  IAnalysisRenderCallback,
} from './IAnalysisRenderCallback';
import {
  IGetAnalysisOptions,
} from './IGetAnalysisOptions';

export interface IAnalysisSuite {
  getAnalysis(options?: IGetAnalysisOptions): IAnalysis;

  addRenderListener(
    renderCallback: IAnalysisRenderCallback,
    name?: string,
  ): void;

  removeRenderListener(name: string): this;
}
