import {
  IAnalysableNode,
} from '../Node/IAnalysableNode';
import {
  IBaseNode,
} from '../Node/IBaseNode';
import {
  ICollectionSubmanager,
} from './ICollectionSubmanager';
import {
  IPanelRegisterableNode,
} from '../Node/IPanelRegisterableNode';
import {
  IPlayerSubmanager,
} from './IPlayerSubmanager';
import {
  NodeTypes,
} from '../enums/NodeTypes';

export interface IManager extends IBaseNode, IAnalysableNode {
  readonly type: NodeTypes.Manager;
  readonly collection: ICollectionSubmanager;
  readonly player: IPlayerSubmanager;
  volumePanelRegister(node: IPanelRegisterableNode): this;
  volumePanelUnregister(node: IPanelRegisterableNode): this;
}
