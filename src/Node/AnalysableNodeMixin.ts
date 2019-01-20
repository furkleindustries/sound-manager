import {
  AnalysisSuite,
} from '../AnalysisSuite/AnalysisSuite';
import {
  assertValid,
} from '../assertions/assertValid';
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
  IConstructor,
} from '../interfaces/IConstructor';
import {
  INode,
} from './INode';

export function AnalysableNodeMixin<T extends IConstructor<INode>>(Base: T) {
  return class AnalysableNodeMixin extends Base implements IAnalysableNode {
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