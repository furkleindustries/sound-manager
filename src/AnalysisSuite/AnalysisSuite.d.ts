import { IAnalysis } from './IAnalysis';
import { IAnalysisRenderCallback } from './IAnalysisRenderCallback';
import { IAnalysisSuite } from './IAnalysisSuite';
export declare class AnalysisSuite implements IAnalysisSuite {
    private readonly __analyserNode;
    private readonly node;
    private __eventMap;
    private __autoIdCounter;
    constructor(analyserNode: AnalyserNode);
    getAnalysis(): IAnalysis;
    addRenderListener(renderCallback: IAnalysisRenderCallback, name?: string): this;
    removeRenderListener(name: string): this;
    removeRenderListener(names: string): this;
    private __init;
    private __getNewId;
}
