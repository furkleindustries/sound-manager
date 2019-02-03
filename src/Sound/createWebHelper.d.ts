import { ICreateSoundOptions } from './ICreateSoundOptions';
import { ISound } from './ISound';
export declare const strings: {
    BOTH_FAILED: string;
    WEB_AUDIO_FAILED: string;
};
export declare function createWebHelper(options: ICreateSoundOptions): Promise<ISound>;
