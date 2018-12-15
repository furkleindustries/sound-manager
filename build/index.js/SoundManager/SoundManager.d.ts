import { ISoundManager } from './ISoundManager';
export declare class SoundManager implements ISoundManager {
    channels: {
        default: any;
    };
    masterVolume: number;
    getChannel(name: string): any;
}
