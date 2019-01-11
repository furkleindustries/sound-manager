import {
  IAnalysisSuite,
} from '../AnalysisSuite/IAnalysisSuite';

export interface IAnalysableNode {
  readonly analysis: IAnalysisSuite | null;
  getAnalyserNode(): AnalyserNode;
  getOutputNode(): AnalyserNode;
}
