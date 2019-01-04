import {
  IPanelRegisterableNode,
} from '../../Node/IPanelRegisterableNode';

export interface IVolumePanelSubmanager {
  __volumePanelElement: HTMLElement | null;
  generateVolumePanelElement(): HTMLElement;
  updateVolumePanelElement(): this;
  volumePanelRegister(node: IPanelRegisterableNode): this;
  volumePanelDeregister(node: IPanelRegisterableNode): this;
}
