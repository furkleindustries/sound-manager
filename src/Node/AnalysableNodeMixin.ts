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
    public readonly analysis: IAnalysisSuite | null = null;
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
        this.analysis = new AnalysisSuite(this.getAnalyserNode());
      }
    }

    public getAnalyserNode() {
      assertNodeIsWebAudio(this, 'getAnalyserNode');
      return assertValid<AnalyserNode>(this.__analyserNode);
    }

    public getOutputNode() {
      return this.getAnalyserNode();
    }
  };
}