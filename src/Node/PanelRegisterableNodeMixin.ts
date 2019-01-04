import {
  IConstructor,
} from '../interfaces/IConstructor';
import {
  IManagerNode,
} from './IManagerNode';
import {
  IPanelRegisterableNode,
} from './IPanelRegisterableNode';

export function PanelRegisterableNodeMixin<T extends IConstructor<IManagerNode>>(Base: T) {
  return class PanelRegisterableNode extends Base implements IPanelRegisterableNode {
    public __panelRegistered: boolean = false;

    public isPanelRegistered() {
      return this.__panelRegistered;
    }

    public panelRegister() {
      this.__panelRegistered = true;
      return this;
    }

    public panelUnregister() {
      this.__panelRegistered = false;
      return this;
    }
  }
}