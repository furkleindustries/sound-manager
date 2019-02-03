import { IGroup } from './IGroup';
import { IGroupOptions } from './IGroupOptions';
import { ISound } from '../Sound/ISound';
import { ISoundsMap } from './ISoundsMap';
import { BaseNode } from '../Node/BaseNode';
import { NodeTypes } from '../enums/NodeTypes';
declare const Group_base: {
    new (...options: any[]): {
        readonly analysisSuite: import("../AnalysisSuite/IAnalysisSuite").IAnalysisSuite | null;
        readonly __analyserNode: AnalyserNode | null;
        getAnalyserNode(): AnalyserNode;
        getOutputNode(): AnalyserNode;
        readonly type: NodeTypes;
        isWebAudio(): boolean;
        getAudioContext(): AudioContext;
        getContextCurrentTime(): number;
        getGainNode(): GainNode;
        getInputNode(): AudioNode;
        getVolume(): number;
        setVolume(value: number): import("../Node/IBaseNode").IBaseNode;
    };
} & {
    new (...args: any[]): {
        __panelRegistered: boolean;
        isPanelRegistered(): boolean;
        panelRegister(): any;
        panelUnregister(): any;
        readonly type: NodeTypes;
        isWebAudio(): boolean;
        getAudioContext(): AudioContext;
        getContextCurrentTime(): number;
        getGainNode(): GainNode;
        getInputNode(): AudioNode;
        getVolume(): number;
        setVolume(value: number): import("../Node/IBaseNode").IBaseNode;
    };
} & {
    new (...options: any[]): {
        __tags: ReadonlyArray<string>;
        readonly tags: ReadonlyArray<string>;
        hasTag(tag: string): boolean;
        addTag(tag: string): any;
        removeTag(tag: string): any;
        readonly type: NodeTypes;
        isWebAudio(): boolean;
        getAudioContext(): AudioContext;
        getContextCurrentTime(): number;
        getGainNode(): GainNode;
        getInputNode(): AudioNode;
        getVolume(): number;
        setVolume(value: number): import("../Node/IBaseNode").IBaseNode;
    };
} & typeof BaseNode;
export declare class Group extends Group_base implements IGroup {
    readonly type: NodeTypes.Group;
    private __sounds;
    readonly sounds: ISoundsMap;
    constructor(options: IGroupOptions);
    setVolume(value: number): this;
    getSound(name: string): ISound;
    getSounds(names: string[]): ISound[];
    getAllSounds(): ISound[];
    getSoundsByTag(tag: string): ISound[];
    getSoundsByTags(tags: string[], matchOneOrAll?: 'one' | 'all'): ISound[];
    addSound(name: string, sound: ISound): this;
    addSounds(sounds: ISoundsMap): this;
    removeSound(name: string): this;
    removeSounds(names: string[]): this;
    removeAllSounds(): this;
    playSound(name: string): Promise<Event>;
    playSounds(names: string[]): Promise<Event[]>;
    playAllSounds(): Promise<Event[]>;
    pauseSound(name: string): this;
    pauseSounds(names: string[]): this;
    pauseAllSounds(): this;
    stopSound(name: string): this;
    stopSounds(names: string[]): this;
    stopAllSounds(): this;
    updateAllAudioElementsVolume(): this;
}
export {};
