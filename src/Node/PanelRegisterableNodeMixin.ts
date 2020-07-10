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
    public panelRegistered = false;

    constructor(...args: any[]) {
      super(args);

      const options = args[0] as { panelRegistered?: boolean };
      if (options && typeof options.panelRegistered === 'boolean') {
        this.panelRegistered = options.panelRegistered;
      }
    }

    public readonly isPanelRegistered = () => this.panelRegistered;

    public readonly panelRegister = () => {
      this.panelRegistered = true;
      return this;
    };

    public readonly panelUnregister = () => {
      this.panelRegistered = false;
      return this;
    };
  }
}
