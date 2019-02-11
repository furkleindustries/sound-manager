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
  generateAudioPanelElement,
} from './generateAudioPanelElement';
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
import {
  updateAudioPanelElement,
} from './updateAudioPanelElement';

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

    this.collection = new CollectionSubmanager({
      getManagerVolume: () => this.getVolume(),
      isWebAudio: () => isWebAudio,
      getAudioContext: () => this.getAudioContext(),
      getInputNode: () => this.getInputNode(),
      groups: groups || {},
    });

    this.player = new PlayerSubmanager({
      getCollection: () => this.collection,
    });

    if (isValidVolume(volume)) {
      this.setVolume(volume);
    }
  }

  private __connectNodes() {
    assertNodeIsWebAudio(this, '__connectNodes' as any);
    this.getInputNode().connect(this.getOutputNode());
    this.getOutputNode().connect(this.getAudioContext().destination);
  }

  public setVolume(value: number) {
    super.setVolume(value);
    this.collection.updateAllAudioElementsVolume();

    return this;
  }

  /* Volume panel */
  private __volumePanelElement: HTMLElement | null = null;

  public generateVolumePanelElement(): HTMLElement {
    this.__volumePanelElement = generateAudioPanelElement(this);
    return this.__volumePanelElement;
  }

  public updateVolumePanelElement() {
    const safeVolumePanelElement = assertValid<HTMLElement>(
      this.__volumePanelElement,
    );

    const newElem = updateAudioPanelElement(this, safeVolumePanelElement);
    this.__volumePanelElement = newElem;

    return this;
  }

  public volumePanelRegister(node: IPanelRegisterableNode) {
    assertValid<IPanelRegisterableNode>(
      node,
    ).__panelRegistered = true;

    if (this.__volumePanelElement) {
      this.updateVolumePanelElement();
    }

    return this;
  }

  public volumePanelDeregister(node: IPanelRegisterableNode) {
    assertValid<IPanelRegisterableNode>(
      node,
    ).__panelRegistered = false;

    if (this.__volumePanelElement) {
      this.updateVolumePanelElement();
    }

    return this;
  }
}
