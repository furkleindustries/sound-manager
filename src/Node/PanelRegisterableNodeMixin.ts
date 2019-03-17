import {
  IBaseNode,
} from './IBaseNode';
import {
  IConstructor,
} from '../interfaces/IConstructor';
import {
  IPanelRegisterableNode,
} from './IPanelRegisterableNode';

export function PanelRegisterableNodeMixin<T extends IConstructor<IBaseNode>>(Base: T) {
  return class PanelRegisterableNode extends Base implements IPanelRegisterableNode {
    public __panelRegistered: boolean = false;

    public readonly isPanelRegistered = () =>this.__panelRegistered;

    public readonly panelRegister = () => {
      this.__panelRegistered = true;
      return this;
    };

    public readonly panelUnregister = () => {
      this.__panelRegistered = false;
      return this;
    };
  }
}