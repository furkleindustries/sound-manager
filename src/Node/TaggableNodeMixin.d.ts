import { IBaseNode } from './IBaseNode';
import { IConstructor } from '../interfaces/IConstructor';
export declare function TaggableNodeMixin<T extends IConstructor<IBaseNode>>(Base: T): {
    new (...options: any[]): {
        __tags: ReadonlyArray<string>;
        readonly tags: ReadonlyArray<string>;
        hasTag(tag: string): boolean;
        addTag(tag: string): any;
        removeTag(tag: string): any;
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
