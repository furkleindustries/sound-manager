import { IBaseNode } from '../Node/IBaseNode';
export declare const strings: {
    ASSERTION_FAILURE: string;
    NODE_INVALID: string;
};
export declare function assertNodeIsWebAudio<T extends IBaseNode>(node: T, methodName?: keyof T): boolean;
