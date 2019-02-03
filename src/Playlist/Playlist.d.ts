import { IFade } from '../Fade/IFade';
import { IPlaylist } from './IPlaylist';
import { IPlaylistOptions } from './IPlaylistOptions';
import { ISoundGroupIdentifier } from '../interfaces/ISoundGroupIdentifier';
export declare class Playlist implements IPlaylist {
    readonly loop: boolean | number;
    readonly ids: ReadonlyArray<ISoundGroupIdentifier>;
    readonly fade: IFade | null;
    readonly callback?: (events: Event[]) => any;
    constructor(options: IPlaylistOptions);
    loopIsValid(): boolean;
    tryCallback(events: Event[], name?: string): void;
}
