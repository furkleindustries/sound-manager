import { IFade } from '../Fade/IFade';
import { IFadeOptions } from '../Fade/IFadeOptions';
import { ISoundGroupIdentifier } from '../interfaces/ISoundGroupIdentifier';
export interface IPlaylistOptions {
    ids: Array<ISoundGroupIdentifier | string>;
    callback?(events: Event[]): any;
    fade?: IFade | IFadeOptions | boolean;
    loop?: boolean | number;
}
