import {
  IAnalysableNode,
} from '../Node/IAnalysableNode';
import {
  IManagerNode,
} from '../Node/IManagerNode';
import {
  INodeCollectionSubmanager,
} from './Submanagers/INodeCollectionSubmanager';
import {
  INodePlaySubmanager,
} from './Submanagers/INodePlaySubmanager';
import {
  IVolumePanelSubmanager,
} from './Submanagers/IVolumePanelSubmanager';

export interface IManager
  extends
    IManagerNode,
    INodeCollectionSubmanager,
    INodePlaySubmanager,
    IVolumePanelSubmanager,
    IAnalysableNode
{}
