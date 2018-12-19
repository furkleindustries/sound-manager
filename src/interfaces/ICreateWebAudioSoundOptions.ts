import {
  ICreateSoundOptions,
} from './ICreateSoundOptions';

export interface ICreateWebAudioSoundOptions extends ICreateSoundOptions {
  buffer: AudioBuffer;
}
