[sound-manager](../README.md) > [Manager](../classes/manager.md)

# Class: Manager

## Hierarchy

 `AnalysableNodeMixin`<`VolumePanelSubmanagerMixin` & `NodePlaySubmanagerMixin` & `NodeCollectionSubmanagerMixin` & [ManagerNode](managernode.md), `this`> & `VolumePanelSubmanagerMixin`<`NodePlaySubmanagerMixin` & `NodeCollectionSubmanagerMixin` & [ManagerNode](managernode.md), `this`> & `NodePlaySubmanagerMixin`<`NodeCollectionSubmanagerMixin` & [ManagerNode](managernode.md), `this`> & `NodeCollectionSubmanagerMixin`<[ManagerNode](managernode.md), `this`> & [ManagerNode](managernode.md)<`this`>

**↳ Manager**

## Implements

* [IManager](../interfaces/imanager.md)

## Index

### Constructors

* [constructor](manager.md#constructor)

### Accessors

* [type](manager.md#type)

### Methods

* [__connectGroupNodes](manager.md#__connectgroupnodes)
* [__connectNodes](manager.md#__connectnodes)
* [__initializeGroups](manager.md#__initializegroups)
* [setVolume](manager.md#setvolume)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Manager**(options?: *[IManagerOptions](../interfaces/imanageroptions.md)*): [Manager](manager.md)

*Defined in [Manager/Manager.ts:52](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Manager.ts#L52)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [IManagerOptions](../interfaces/imanageroptions.md) |

**Returns:** [Manager](manager.md)

___

## Accessors

<a id="type"></a>

###  type

gettype(): [NodeTypes](../enums/nodetypes.md)

*Defined in [Manager/Manager.ts:50](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Manager.ts#L50)*

**Returns:** [NodeTypes](../enums/nodetypes.md)

___

## Methods

<a id="__connectgroupnodes"></a>

### `<Private>` __connectGroupNodes

▸ **__connectGroupNodes**(): `void`

*Defined in [Manager/Manager.ts:98](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Manager.ts#L98)*

**Returns:** `void`

___
<a id="__connectnodes"></a>

### `<Private>` __connectNodes

▸ **__connectNodes**(): `void`

*Defined in [Manager/Manager.ts:80](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Manager.ts#L80)*

**Returns:** `void`

___
<a id="__initializegroups"></a>

### `<Private>` __initializeGroups

▸ **__initializeGroups**(groups?: *[IGroupsMap](../interfaces/igroupsmap.md)*): `void`

*Defined in [Manager/Manager.ts:86](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Manager.ts#L86)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` groups | [IGroupsMap](../interfaces/igroupsmap.md) |

**Returns:** `void`

___
<a id="setvolume"></a>

###  setVolume

▸ **setVolume**(value: *`number`*): `this`

*Implementation of [IManager](../interfaces/imanager.md).[setVolume](../interfaces/imanager.md#setvolume)*

*Defined in [Manager/Manager.ts:105](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Manager.ts#L105)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |

**Returns:** `this`

___

