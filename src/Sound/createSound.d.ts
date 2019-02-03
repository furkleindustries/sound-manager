import { ICreateSoundOptions } from './ICreateSoundOptions';
import { ISound } from './ISound';
export declare const strings: {
    OPTIONS_INVALID: string;
};
export declare function createSound(options: ICreateSoundOptions): Promise<ISound>;
