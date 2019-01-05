[sound-manager](../README.md) > [INodeCollectionSubmanager](../interfaces/inodecollectionsubmanager.md)

# Interface: INodeCollectionSubmanager

## Hierarchy

**INodeCollectionSubmanager**

↳  [IManager](imanager.md)

## Index

### Properties

* [__groups](inodecollectionsubmanager.md#__groups)
* [groups](inodecollectionsubmanager.md#groups)

### Methods

* [addGroup](inodecollectionsubmanager.md#addgroup)
* [addGroups](inodecollectionsubmanager.md#addgroups)
* [addSound](inodecollectionsubmanager.md#addsound)
* [addSounds](inodecollectionsubmanager.md#addsounds)
* [getGroupVolume](inodecollectionsubmanager.md#getgroupvolume)
* [getGroups](inodecollectionsubmanager.md#getgroups)
* [getSoundVolume](inodecollectionsubmanager.md#getsoundvolume)
* [getSounds](inodecollectionsubmanager.md#getsounds)
* [initializeDefaultGroup](inodecollectionsubmanager.md#initializedefaultgroup)
* [removeAllGroups](inodecollectionsubmanager.md#removeallgroups)
* [removeAllSounds](inodecollectionsubmanager.md#removeallsounds)
* [removeGroups](inodecollectionsubmanager.md#removegroups)
* [removeSounds](inodecollectionsubmanager.md#removesounds)
* [setGroupVolume](inodecollectionsubmanager.md#setgroupvolume)
* [setSoundVolume](inodecollectionsubmanager.md#setsoundvolume)
* [updateAllAudioElementsVolume](inodecollectionsubmanager.md#updateallaudioelementsvolume)

---

## Properties

<a id="__groups"></a>

###  __groups

**● __groups**: *[IGroupsMap](igroupsmap.md)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:12](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L12)*

___
<a id="groups"></a>

###  groups

**● groups**: *[IGroupsMap](igroupsmap.md)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L11)*

___

## Methods

<a id="addgroup"></a>

###  addGroup

▸ **addGroup**(name: *`string`*, options?: *[IGroupOptions](igroupoptions.md)*): [IGroup](igroup.md)

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:13](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` options | [IGroupOptions](igroupoptions.md) |

**Returns:** [IGroup](igroup.md)

___
<a id="addgroups"></a>

###  addGroups

▸ **addGroups**(groups: *[IGroupsMap](igroupsmap.md)*): `this`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:14](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| groups | [IGroupsMap](igroupsmap.md) |

**Returns:** `this`

___
<a id="addsound"></a>

###  addSound

▸ **addSound**(name: *`string`*, options: *[ICreateSoundOptions](icreatesoundoptions.md)*, groupName?: *`undefined` | `string`*): `Promise`<[ISound](isound.md)>

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:23](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| options | [ICreateSoundOptions](icreatesoundoptions.md) |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `Promise`<[ISound](isound.md)>

___
<a id="addsounds"></a>

###  addSounds

▸ **addSounds**(sounds: *[ISoundsMap](isoundsmap.md)*, groupName?: *`undefined` | `string`*): `this`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:28](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sounds | [ISoundsMap](isoundsmap.md) |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

___
<a id="getgroupvolume"></a>

###  getGroupVolume

▸ **getGroupVolume**(name?: *`undefined` | `string`*): `number`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:21](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` name | `undefined` | `string` |

**Returns:** `number`

___
<a id="getgroups"></a>

###  getGroups

▸ **getGroups**(name: *`string`*): [IGroup](igroup.md)

▸ **getGroups**(names: *`string`[]*): [IGroup](igroup.md)[]

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:16](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** [IGroup](igroup.md)

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:17](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** [IGroup](igroup.md)[]

___
<a id="getsoundvolume"></a>

###  getSoundVolume

▸ **getSoundVolume**(name: *`string`*, groupName?: *`undefined` | `string`*): `number`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:34](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `number`

___
<a id="getsounds"></a>

###  getSounds

▸ **getSounds**(name: *`string`*, groupName?: *`undefined` | `string`*): [ISound](isound.md)

▸ **getSounds**(names: *`string`[]*, groupName?: *`undefined` | `string`*): [ISound](isound.md)[]

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:29](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** [ISound](isound.md)

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:30](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |
| `Optional` groupName | `undefined` | `string` |

**Returns:** [ISound](isound.md)[]

___
<a id="initializedefaultgroup"></a>

###  initializeDefaultGroup

▸ **initializeDefaultGroup**(): `this`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:15](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L15)*

**Returns:** `this`

___
<a id="removeallgroups"></a>

###  removeAllGroups

▸ **removeAllGroups**(): `this`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:20](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L20)*

**Returns:** `this`

___
<a id="removeallsounds"></a>

###  removeAllSounds

▸ **removeAllSounds**(groupName?: *`undefined` | `string`*): `this`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:33](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L33)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

___
<a id="removegroups"></a>

###  removeGroups

▸ **removeGroups**(name: *`string`*): `this`

▸ **removeGroups**(names: *`string`[]*): `this`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:18](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `this`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:19](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** `this`

___
<a id="removesounds"></a>

###  removeSounds

▸ **removeSounds**(name: *`string`*, groupName?: *`undefined` | `string`*): `this`

▸ **removeSounds**(names: *`string`[]*, groupName?: *`undefined` | `string`*): `this`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:31](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:32](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

___
<a id="setgroupvolume"></a>

###  setGroupVolume

▸ **setGroupVolume**(value: *`number`*, groupName?: *`undefined` | `string`*): `this`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:22](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

___
<a id="setsoundvolume"></a>

###  setSoundVolume

▸ **setSoundVolume**(name: *`string`*, value: *`number`*, groupName?: *`undefined` | `string`*): `this`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:35](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L35)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| value | `number` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

___
<a id="updateallaudioelementsvolume"></a>

###  updateAllAudioElementsVolume

▸ **updateAllAudioElementsVolume**(): `this`

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:36](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L36)*

**Returns:** `this`

___

