import {
  ISound,
} from '../Sound/ISound';

export interface IChannelSoundsMap {
  readonly [key: string]: ISound;
}
