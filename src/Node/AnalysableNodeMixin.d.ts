import { IAnalysisSuite } from '../AnalysisSuite/IAnalysisSuite';
import { IBaseNode } from './IBaseNode';
import { IConstructor } from '../interfaces/IConstructor';
export declare function AnalysableNodeMixin<T extends IConstructor<IBaseNode>>(Base: T): {
    new (...options: any[]): {
        readonly analysisSuite: IAnalysisSuite | null;
        readonly __analyserNode: AnalyserNode | null;
        getAnalyserNode(): AnalyserNode;
        getOutputNode(): AnalyserNode;
        readonly type: import("../enums/NodeTypes").NodeTypes;
        isWebAudio(): boolean;
        getAudioContext(): AudioContext;
        getContextCurrentTime(): number;
        getGainNode(): GainNode;
        getInputNode(): AudioNode;
        getVolume(): number;
        setVolume(value: number): IBaseNode;
    };
} & T;
