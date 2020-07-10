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
  getFrozenObject,
} from '../functions/getFrozenObject';
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
  isValidVolume,
} from '../functions/isValidVolume';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  PlayerSubmanager,
} from './PlayerSubmanager';
import {
  assertValid,
} from 'ts-assertions';

export class Manager extends AnalysableNodeMixin(BaseNode) implements IManager {
  get type(): NodeTypes.Manager {
    return NodeTypes.Manager;
  }

  public readonly collection: ICollectionSubmanager;

  public readonly player: IPlayerSubmanager;

  constructor(options?: IManagerOptions) {
    super({ ...options });

    const {
      groups,
      volume,
    } = getFrozenObject(options!);

    const isWebAudio = this.isWebAudio();
    if (isWebAudio) {
      this.__connectNodes();
    }

    this.collection = new CollectionSubmanager(
      {
        getManagerVolume: () => this.getVolume(),
        isWebAudio: () => isWebAudio,
        getAudioContext: () => this.getAudioContext(),
        getInputNode: () => this.getInputNode(),
        groups: groups || {},
      },
    );

    this.player = new PlayerSubmanager(
      { getCollection: () => this.collection },
    );

    if (isValidVolume(volume)) {
      this.setVolume(volume);
    }
  }

  private readonly __connectNodes = () => {
    assertNodeIsWebAudio(this, '__connectNodes' as any);
    this.getInputNode().connect(this.getOutputNode());
    this.getOutputNode().connect(this.getAudioContext().destination);
  };

  public readonly setVolume = (value: number) => {
    super.setVolume(value);
    this.collection.updateAllAudioElementsVolume();

    this.callStateCallbacks();

    return this;
  };

  public readonly volumePanelRegister = (node: IPanelRegisterableNode) => {
    assertValid<IPanelRegisterableNode>(
      node,
    ).__panelRegistered = true;

    this.callStateCallbacks();

    return this;
  };

  public readonly volumePanelUnregister = (node: IPanelRegisterableNode) => {
    assertValid<IPanelRegisterableNode>(
      node,
    ).__panelRegistered = false;

    this.callStateCallbacks();

    return this;
  };

  private readonly __stateCallbacks: Array<() => void> = [];
  public readonly registerStateCallback = (cb: () => void) => {
    this.__stateCallbacks.push(cb);
  };

  public readonly unregisterStateCallback = (cb: () => void) => {
    const idx = this.__stateCallbacks.indexOf(cb);
    if (idx !== -1) {
      this.__stateCallbacks.splice(idx, 1);
    }
  };

  public readonly callStateCallbacks = () => {
    this.__stateCallbacks.forEach((cb) => cb());
  };
}
