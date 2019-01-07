import {
  AnalysableNodeMixin,
} from '../Node/AnalysableNodeMixin';
import {
  assertNodeIsWebAudio,
} from '../assertions/assertNodeIsWebAudio';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  IGroupsMap,
} from './IGroupsMap';
import {
  IManager,
} from './IManager';
import {
  IManagerOptions,
} from './IManagerOptions';
import {
  ManagerNode,
} from '../Node/ManagerNode';
import {
  NodeCollectionSubmanagerMixin,
} from './Submanagers/NodeCollectionSubmanagerMixin';
import {
  NodePlaySubmanagerMixin,
} from './Submanagers/NodePlaySubmanagerMixin';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  VolumePanelSubmanagerMixin
} from './Submanagers/VolumePanelSubmanagerMixin';

declare const webkitAudioContext: AudioContext;
const ctxCtor = AudioContext || webkitAudioContext;

export class Manager
  extends
    /* Mixins are added from bottom to top. The order of these *does*
     * matter. */
    AnalysableNodeMixin(
    VolumePanelSubmanagerMixin(
    NodePlaySubmanagerMixin(
    NodeCollectionSubmanagerMixin(
      ManagerNode
    ))))
  implements IManager
{
  get type() {
    return NodeTypes.Manager;
  }

  constructor(options?: IManagerOptions) {
    super({ ...options });

    if (!this.__audioContext && ctxCtor) {
      /* any cast is for typedoc complaints. */
      this.__audioContext = new (ctxCtor as any)();
      this.__isWebAudio = true;
    }

    const opts = options || {};
    const {
      groups,
      masterVolume,
    } = opts;

    if (this.isWebAudio()) {
      this.__connectNodes();
    }

    this.__initializeGroups(groups);

    if (typeof masterVolume !== 'undefined') {
      this.setVolume(masterVolume);
    }
  }

  private __connectNodes() {
    assertNodeIsWebAudio(this, '__connectNodes' as any);
    this.getInputNode().connect(this.getOutputNode());
    this.getOutputNode().connect(this.getAudioContext().destination);
  }

  private __initializeGroups(groups?: IGroupsMap) {
    /* Add the 'default' group. */
    this.initializeDefaultGroup();

    if (groups) {
      this.__groups = getFrozenObject(this.__groups, groups);
      if (this.isWebAudio()) {
        this.__connectGroupNodes();
      }
    }
  }

  private __connectGroupNodes() {
    assertNodeIsWebAudio(this, '__connectGroupNodes' as any);
    this.getAllGroups().forEach((group) => (
      group.getOutputNode().connect(this.getInputNode())
    ));
  }

  public setVolume(value: number) {
    super.setVolume(value);
    this.updateAllAudioElementsVolume();

    return this;
  }
}
