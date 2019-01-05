[sound-manager](../README.md) > [IVolumePanelSubmanager](../interfaces/ivolumepanelsubmanager.md)

# Interface: IVolumePanelSubmanager

## Hierarchy

**IVolumePanelSubmanager**

↳  [IManager](imanager.md)

## Index

### Properties

* [__volumePanelElement](ivolumepanelsubmanager.md#__volumepanelelement)

### Methods

* [generateVolumePanelElement](ivolumepanelsubmanager.md#generatevolumepanelelement)
* [updateVolumePanelElement](ivolumepanelsubmanager.md#updatevolumepanelelement)
* [volumePanelDeregister](ivolumepanelsubmanager.md#volumepanelderegister)
* [volumePanelRegister](ivolumepanelsubmanager.md#volumepanelregister)

---

## Properties

<a id="__volumepanelelement"></a>

###  __volumePanelElement

**● __volumePanelElement**: *`HTMLElement` | `null`*

*Defined in [Manager/Submanagers/IVolumePanelSubmanager.ts:6](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/IVolumePanelSubmanager.ts#L6)*

___

## Methods

<a id="generatevolumepanelelement"></a>

###  generateVolumePanelElement

▸ **generateVolumePanelElement**(): `HTMLElement`

*Defined in [Manager/Submanagers/IVolumePanelSubmanager.ts:7](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/IVolumePanelSubmanager.ts#L7)*

**Returns:** `HTMLElement`

___
<a id="updatevolumepanelelement"></a>

###  updateVolumePanelElement

▸ **updateVolumePanelElement**(): `this`

*Defined in [Manager/Submanagers/IVolumePanelSubmanager.ts:8](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/IVolumePanelSubmanager.ts#L8)*

**Returns:** `this`

___
<a id="volumepanelderegister"></a>

###  volumePanelDeregister

▸ **volumePanelDeregister**(node: *[IPanelRegisterableNode](ipanelregisterablenode.md)*): `this`

*Defined in [Manager/Submanagers/IVolumePanelSubmanager.ts:10](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/IVolumePanelSubmanager.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [IPanelRegisterableNode](ipanelregisterablenode.md) |

**Returns:** `this`

___
<a id="volumepanelregister"></a>

###  volumePanelRegister

▸ **volumePanelRegister**(node: *[IPanelRegisterableNode](ipanelregisterablenode.md)*): `this`

*Defined in [Manager/Submanagers/IVolumePanelSubmanager.ts:9](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/IVolumePanelSubmanager.ts#L9)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [IPanelRegisterableNode](ipanelregisterablenode.md) |

**Returns:** `this`

___

