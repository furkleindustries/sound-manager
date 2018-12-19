import {
  IGroupsMap,
} from './IGroupsMap';

export interface ISoundManagerOptions {
  context?: AudioContext;
  groups?: IGroupsMap;
  masterVolume?: number;
}
