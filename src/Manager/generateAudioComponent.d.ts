import { IAnalysableNode } from '../Node/IAnalysableNode';
import { IBaseNode } from '../Node/IBaseNode';
export declare const strings: {
    ANALYSIS_SUITE_INVALID: string;
    NODE_INVALID: string;
    NODE_TYPE_INVALID: string;
};
export declare function generateAudioComponent(node: IBaseNode & IAnalysableNode, name?: string): HTMLDivElement;
