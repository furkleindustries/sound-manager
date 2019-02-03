import { ISound } from './ISound';
export declare const strings: {
    AUDIO_ELEMENT_INVALID: string;
    SOUND_INVALID: string;
    SOUND_PLAYING: string;
};
export declare function playAudioSource(sound: ISound, audioElement?: HTMLAudioElement | null): void;
