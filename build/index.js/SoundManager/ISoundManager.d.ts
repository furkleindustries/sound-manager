import { IChannel } from '../Channel/IChannel';
import { ISound } from '../Sound/ISound';
export interface ISoundManager {
    readonly channels: {
        [key: string]: IChannel;
    };
    getChannel(name: string): IChannel;
    addChannel(name: string, channel: IChannel): ISoundManager;
    removeChannel(name: string): ISoundManager;
    clearAllChannels(): ISoundManager;
    getSound(name: string, channelName?: string): ISound;
    addSound(name: string, sound: ISound, channelName?: string): ISoundManager;
    removeSound(name: string, channelName?: string): ISoundManager;
    readonly masterVolume: number;
    setMasterVolume(value: number): ISoundManager;
    getChannelVolume(channelName: string): number;
    setChannelVolume(value: number, channelName: string): ISoundManager;
}
