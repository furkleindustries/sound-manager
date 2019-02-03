import { IBaseNode } from './IBaseNode';
import { NodeTypes } from '../enums/NodeTypes';
import { INodeOptions } from './INodeOptions';
export declare class BaseNode implements IBaseNode {
    readonly type: NodeTypes;
    private __volume;
    private __gainNode;
    protected __isWebAudio: boolean;
    protected __audioContext: AudioContext | null;
    constructor(options?: INodeOptions);
    isWebAudio(): boolean;
    getAudioContext(): AudioContext;
    getContextCurrentTime(): number;
    getGainNode(): GainNode;
    getInputNode(): AudioNode;
    getVolume(): number;
    setVolume(value: number): this;
}
