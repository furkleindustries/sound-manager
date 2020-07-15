import {
  BaseNode,
} from '../Node/BaseNode';
import {
  CollectionSubmanager,
} from './CollectionSubmanager';
import {
  ICollectionSubmanager,
} from './ICollectionSubmanager';
import {
  IPanelRegisterableNode,
} from '../Node/IPanelRegisterableNode';
import {
  IManager,
} from './IManager';
import {
  IManagerOptions,
} from './IManagerOptions';
import {
  IPlayerSubmanager,
} from './IPlayerSubmanager';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  PlayerSubmanager,
} from './PlayerSubmanager';
import {
  assertValid,
} from 'ts-assertions';

export class Manager
  extends BaseNode
  implements IManager
{
  get type(): NodeTypes.Manager {
    return NodeTypes.Manager;
  }

  public readonly collection: ICollectionSubmanager;
  public readonly player: IPlayerSubmanager;

  constructor(options?: IManagerOptions) {
    super({ ...options });

    const { groups } = options || {};

    this.collection = new CollectionSubmanager(
      {
        groups,
        getManagerVolume: () => this.getVolume(),
      },
    );

    this.player = new PlayerSubmanager(
      { getCollection: () => this.collection },
    );
  }

  public readonly setVolume = (value: number) => {
    super.setVolume(value);
    this.collection.updateAllAudioElementsVolume();
    return this;
  };

  public readonly volumePanelRegister = (node: IPanelRegisterableNode) => {
    assertValid<IPanelRegisterableNode>(node).panelRegister();
    return this;
  };

  public readonly volumePanelUnregister = (node: IPanelRegisterableNode) => {
    assertValid<IPanelRegisterableNode>(node).panelUnregister();
    return this;
  };
}
