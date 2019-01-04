export interface IPanelRegisterableNode {
  __panelRegistered: boolean;
  isPanelRegistered(): boolean;
  panelRegister(): IPanelRegisterableNode;
  panelUnregister(): IPanelRegisterableNode;
}
