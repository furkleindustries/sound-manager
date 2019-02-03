import { IFade } from '../Fade/IFade';
import { ISoundGroupIdentifier } from '../interfaces/ISoundGroupIdentifier';
export interface IPlaylist {
    readonly fade: IFade | null;
    readonly loop: boolean | number;
    readonly ids: ReadonlyArray<ISoundGroupIdentifier>;
    loopIsValid(): boolean;
    tryCallback(events: Event[], name?: string): void;
    callback?(events: Event[]): void;
}
