import {
  IGroupsMap,
} from './IGroupsMap';
import {
  INodeOptions,
} from '../Node/INodeOptions';

export interface IManagerOptions extends INodeOptions {
  groups?: IGroupsMap;
}
