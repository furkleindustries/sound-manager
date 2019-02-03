import { IAnalysisRenderCallback } from './IAnalysisRenderCallback';
export declare const strings: {
    CANVAS_CONTEXT_2D_INVALID: string;
    CANVAS_INVALID: string;
};
export declare function getVolumeLevelRenderListener(canvas: HTMLCanvasElement, color?: string): IAnalysisRenderCallback;
