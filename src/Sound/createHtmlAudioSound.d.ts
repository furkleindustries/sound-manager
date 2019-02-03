import { ICreateSoundOptions } from './ICreateSoundOptions';
import { ISound } from './ISound';
export declare const strings: {
    GET_MANAGER_VOLUME_INVALID: string;
    OPTIONS_INVALID: string;
    URL_INVALID: string;
};
export declare function createHtmlAudioSound(options: ICreateSoundOptions): Promise<ISound>;
