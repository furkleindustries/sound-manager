import {
  IChannel,
} from '../Channel/IChannel';

export interface ISoundManagerChannelsMap {
  readonly [key: string]: IChannel;
}
