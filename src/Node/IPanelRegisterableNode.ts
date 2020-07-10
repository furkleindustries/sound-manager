export interface IPanelRegisterableNode {
  panelRegistered: boolean;
  isPanelRegistered(): boolean;
  panelRegister(): IPanelRegisterableNode;
  panelUnregister(): IPanelRegisterableNode;
}
