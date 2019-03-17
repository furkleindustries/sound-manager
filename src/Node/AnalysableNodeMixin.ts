import {
  AnalysisSuite,
} from '../AnalysisSuite/AnalysisSuite';
import {
  assertNodeIsWebAudio,
} from '../assertions/assertNodeIsWebAudio';
import {
  IAnalysableNode,
} from './IAnalysableNode';
import {
  IAnalysisSuite,
} from '../AnalysisSuite/IAnalysisSuite';
import {
  IBaseNode,
} from './IBaseNode';
import {
  IConstructor,
} from '../interfaces/IConstructor';
import {
  assertValid,
} from 'ts-assertions';

export function AnalysableNodeMixin<T extends IConstructor<IBaseNode>>(Base: T) {
  return class AnalysableNode extends Base implements IAnalysableNode {
    public readonly analysisSuite: IAnalysisSuite | null = null;
    public readonly __analyserNode: AnalyserNode | null = null;

    constructor(...options: any[]) {
      super(...options);
      
      const [
        { context },
      ]: [
        { context?: AudioContext }
      ] = options as [ any ];

      if (context) {
        this.__analyserNode = context.createAnalyser();
        this.analysisSuite = new AnalysisSuite(this.getAnalyserNode());
      }
    }

    public readonly getAnalyserNode = () => {
      assertNodeIsWebAudio(this, 'getAnalyserNode');
      return assertValid<AnalyserNode>(this.__analyserNode);
    };

    public readonly getOutputNode = () => {
      return this.getAnalyserNode();
    };
  };
}
