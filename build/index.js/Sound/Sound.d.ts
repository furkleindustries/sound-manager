import { ISound } from './ISound';
import { ISoundOptions } from './ISoundOptions';
export declare class Sound implements ISound {
    private __sourceNode;
    readonly sourceNode: AudioBufferSourceNode;
    private __gainNode;
    readonly gainNode: GainNode;
    readonly volume: number;
    readonly loop: boolean;
    private __startedTime;
    private __pausedTime;
    readonly trackPosition: number;
    private __playing;
    readonly playing: boolean;
    getContextCurrentTime: () => number;
    constructor(options: ISoundOptions);
    setVolume(value: number): this;
    setLoop(doLoop: boolean): this;
    setTrackPosition(trackPosition: number): this;
    play(): this;
    pause(): this;
    stop(): this;
    rewind(seconds: number): this;
    fastForward(seconds: number): this;
}
