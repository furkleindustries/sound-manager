import {
  IAnalysableNode,
} from '../Node/IAnalysableNode';
import {
  IFactorySubmanager,
} from './Submanagers/IFactorySubmanager';
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
    IFactorySubmanager,
    INodeCollectionSubmanager,
    INodePlaySubmanager,
    IVolumePanelSubmanager,
    IAnalysableNode
{
  updateAllAudioElementsVolume(): this;
}
