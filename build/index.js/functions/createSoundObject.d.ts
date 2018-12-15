import { ISound } from '../Sound/ISound';
import { ISoundOptions } from '../Sound/ISoundOptions';
export declare const createSoundObject: (url: string, context: AudioContext, options?: ISoundOptions | undefined) => Promise<ISound>;
