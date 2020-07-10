import {
  AnalysableNodeMixin,
} from '../Node/AnalysableNodeMixin';
import {
  assertNodeIsWebAudio,
} from '../assertions/assertNodeIsWebAudio';
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
  extends AnalysableNodeMixin(BaseNode)
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

    const isWebAudio = this.isWebAudio();
    if (isWebAudio) {
      this.__connectNodes();
    }

    this.collection = new CollectionSubmanager(
      {
        groups,
        getAudioContext: () => this.getAudioContext(),
        getInputNode: () => this.getInputNode(),
        getManagerVolume: () => this.getVolume(),
        isWebAudio: () => isWebAudio,
      },
    );

    this.player = new PlayerSubmanager(
      { getCollection: () => this.collection },
    );
  }

  private readonly __connectNodes = () => {
    assertNodeIsWebAudio(this, '__connectNodes' as any);
    this.getInputNode().connect(this.getOutputNode());
    this.getOutputNode().connect(this.getAudioContext().destination);
  };

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
