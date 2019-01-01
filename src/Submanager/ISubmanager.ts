import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  SubmanagerTypes,
} from '../enums/SubmanagerTypes';

export interface ISubmanager {
  type: NodeTypes.Submanager;
  subtype: SubmanagerTypes;
}
