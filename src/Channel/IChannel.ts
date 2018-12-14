import {
  ISound,
} from '../Sound/ISound';

export interface IChannel {
  readonly sounds: { [key: string]: ISound, };
  readonly gainNode: GainNode;
  readonly volume: number;
  getSound(name: string): ISound;
  addSound(name: string, sound: ISound): IChannel;
  removeSound(name: string): IChannel;
  clearAllSounds(): IChannel;
  getVolume(): number;
  setVolume(value: number): IChannel;
}
