import { ICreateSoundOptions } from './ICreateSoundOptions';
import { ISound } from './ISound';
export declare const strings: {
    CONTEXT_INVALID: string;
    OPTIONS_INVALID: string;
    URL_INVALID: string;
};
export declare function createWebAudioSound(options: ICreateSoundOptions): Promise<ISound>;
