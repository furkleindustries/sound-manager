import { assert } from '../../assertions/assert';
import { updateAudioPanelElement as updateVolumePanelElement } from '../../functions/updateAudioPanelElement';
import { generateVolumePanelElement } from '../../functions/generateVolumePanelElement';
import { IConstructor } from '../../interfaces/IConstructor';
import { IVolumePanelSubmanager } from './IVolumePanelSubmanager';
import { IManagerNode } from '../../Node/IManagerNode';
import { IPanelRegisterableNode } from '../../Node/IPanelRegisterableNode';
import { INodeCollectionSubmanager } from './INodeCollectionSubmanager';

export function VolumePanelSubmanagerMixin<T extends IConstructor<IManagerNode & INodeCollectionSubmanager>>(Base: T) {
  return class VolumePanelSubmanagerMixin extends Base implements IVolumePanelSubmanager {
    public __volumePanelElement: HTMLElement | null = null;

    public generateVolumePanelElement(): HTMLElement {
      this.__volumePanelElement = generateVolumePanelElement(this);
      return this.__volumePanelElement;
    }

    public updateVolumePanelElement() {
      assert(this.__volumePanelElement);
      const newElem = updateVolumePanelElement(this, this.__volumePanelElement!);
      this.__volumePanelElement = newElem;

      return this;
    }

    public volumePanelRegister(node: IPanelRegisterableNode) {
      assert(node);
      node.__panelRegistered = true;
      if (this.__volumePanelElement) {
        this.updateVolumePanelElement();
      }

      return this;
    }

    public volumePanelDeregister(node: IPanelRegisterableNode) {
      assert(node);
      node.__panelRegistered = false;
      if (this.__volumePanelElement) {
        this.updateVolumePanelElement();
      }

      return this;
    }
  };
}
