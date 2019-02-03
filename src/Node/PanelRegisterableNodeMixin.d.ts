import { IBaseNode } from './IBaseNode';
import { IConstructor } from '../interfaces/IConstructor';
export declare function PanelRegisterableNodeMixin<T extends IConstructor<IBaseNode>>(Base: T): {
    new (...args: any[]): {
        __panelRegistered: boolean;
        isPanelRegistered(): boolean;
        panelRegister(): any;
        panelUnregister(): any;
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
