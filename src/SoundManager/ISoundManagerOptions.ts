import {
  IGroupsMap,
} from './IGroupsMap';

export interface ISoundManagerOptions {
  groups?: IGroupsMap;
  context?: AudioContext;
  masterVolume?: number;
}
