import {
  IAnalysisSuite,
} from '../AnalysisSuite/IAnalysisSuite';

export interface IAnalysableNode {
  readonly analysisSuite: IAnalysisSuite | null;
  getAnalyserNode(): AnalyserNode;
  getOutputNode(): AnalyserNode;
}
