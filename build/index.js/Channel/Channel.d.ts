import { IChannel } from './IChannel';
import { IChannelOptions } from './IChannelOptions';
import { ISound } from '../Sound/ISound';
export declare class Channel implements IChannel {
    private __sounds;
    readonly sounds: {
        [key: string]: ISound;
    };
    private __gainNode;
    readonly gainNode: GainNode;
    readonly volume: number;
    constructor(options: IChannelOptions);
}
