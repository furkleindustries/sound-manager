import { IAnalysis } from './IAnalysis';
export declare class Analysis implements IAnalysis {
    private __node;
    private __getNode;
    getBinCount(): number;
    constructor(node: AnalyserNode);
    getFrequencyByte(array?: Uint8Array): Uint8Array;
    getFrequencyFloat(array?: Float32Array): Float32Array;
    getTimeDomainByte(array?: Uint8Array): Uint8Array;
    getTimeDomainFloat(array?: Float32Array): Float32Array;
}
