import { IFadeOptions } from '../Fade/IFadeOptions';
export interface ICreateSoundOptions {
    isWebAudio: boolean;
    url: string;
    context?: AudioContext;
    fade?: IFadeOptions | boolean;
    loop?: boolean;
    trackPosition?: number;
    volume?: number;
    getManagerVolume?(): number;
}
