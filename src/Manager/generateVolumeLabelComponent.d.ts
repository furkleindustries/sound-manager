import { IBaseNode } from '../Node/IBaseNode';
export declare const strings: {
    NAME_INVALID: string;
    NODE_INVALID: string;
    NODE_TYPE_INVALID: string;
    UNIQUE_ID_INVALID: string;
};
export declare function generateVolumeLabelComponent(node: IBaseNode, uniqueId: string, name?: string): HTMLLabelElement;
