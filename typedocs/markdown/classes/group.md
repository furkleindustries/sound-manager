[sound-manager](../README.md) > [Group](../classes/group.md)

# Class: Group

## Hierarchy

 `PanelRegisterableNode`<`AnalysableNodeMixin` & [ManagerNode](managernode.md), `this`> & `AnalysableNodeMixin`<[ManagerNode](managernode.md), `this`> & [ManagerNode](managernode.md)<`this`>

**↳ Group**

## Implements

* [IGroup](../interfaces/igroup.md)

## Index

### Constructors

* [constructor](group.md#constructor)

### Properties

* [__sounds](group.md#__sounds)

### Accessors

* [sounds](group.md#sounds)
* [type](group.md#type)

### Methods

* [addSound](group.md#addsound)
* [addSounds](group.md#addsounds)
* [getSounds](group.md#getsounds)
* [pauseAllSounds](group.md#pauseallsounds)
* [pauseSounds](group.md#pausesounds)
* [playAllSounds](group.md#playallsounds)
* [playSounds](group.md#playsounds)
* [removeAllSounds](group.md#removeallsounds)
* [removeSounds](group.md#removesounds)
* [setVolume](group.md#setvolume)
* [stopAllSounds](group.md#stopallsounds)
* [stopSound](group.md#stopsound)
* [stopSounds](group.md#stopsounds)
* [updateAllAudioElementsVolume](group.md#updateallaudioelementsvolume)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Group**(options: *[IGroupOptions](../interfaces/igroupoptions.md)*): [Group](group.md)

*Defined in [Group/Group.ts:46](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L46)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [IGroupOptions](../interfaces/igroupoptions.md) |

**Returns:** [Group](group.md)

___

## Properties

<a id="__sounds"></a>

### `<Private>` __sounds

**● __sounds**: *[ISoundsMap](../interfaces/isoundsmap.md)* =  getFrozenObject()

*Defined in [Group/Group.ts:43](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L43)*

___

## Accessors

<a id="sounds"></a>

###  sounds

getsounds(): [ISoundsMap](../interfaces/isoundsmap.md)

*Defined in [Group/Group.ts:44](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L44)*

**Returns:** [ISoundsMap](../interfaces/isoundsmap.md)

___
<a id="type"></a>

###  type

gettype(): [NodeTypes](../enums/nodetypes.md)

*Defined in [Group/Group.ts:39](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L39)*

**Returns:** [NodeTypes](../enums/nodetypes.md)

___

## Methods

<a id="addsound"></a>

###  addSound

▸ **addSound**(name: *`string`*, sound: *[ISound](../interfaces/isound.md)*): `this`

*Implementation of [IGroup](../interfaces/igroup.md).[addSound](../interfaces/igroup.md#addsound)*

*Defined in [Group/Group.ts:83](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L83)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| sound | [ISound](../interfaces/isound.md) |

**Returns:** `this`

___
<a id="addsounds"></a>

###  addSounds

▸ **addSounds**(sounds: *[ISoundsMap](../interfaces/isoundsmap.md)*): `this`

*Implementation of [IGroup](../interfaces/igroup.md).[addSounds](../interfaces/igroup.md#addsounds)*

*Defined in [Group/Group.ts:87](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L87)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sounds | [ISoundsMap](../interfaces/isoundsmap.md) |

**Returns:** `this`

___
<a id="getsounds"></a>

###  getSounds

▸ **getSounds**(name: *`string`*): [ISound](../interfaces/isound.md)

▸ **getSounds**(names: *`string`[]*): [ISound](../interfaces/isound.md)[]

*Implementation of [IGroup](../interfaces/igroup.md).[getSounds](../interfaces/igroup.md#getsounds)*

*Defined in [Group/Group.ts:77](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L77)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** [ISound](../interfaces/isound.md)

*Implementation of [IGroup](../interfaces/igroup.md).[getSounds](../interfaces/igroup.md#getsounds)*

*Defined in [Group/Group.ts:78](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L78)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** [ISound](../interfaces/isound.md)[]

___
<a id="pauseallsounds"></a>

###  pauseAllSounds

▸ **pauseAllSounds**(): `this`

*Implementation of [IGroup](../interfaces/igroup.md).[pauseAllSounds](../interfaces/igroup.md#pauseallsounds)*

*Defined in [Group/Group.ts:170](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L170)*

**Returns:** `this`

___
<a id="pausesounds"></a>

###  pauseSounds

▸ **pauseSounds**(name: *`string`*): `this`

▸ **pauseSounds**(names: *`string`[]*): `this`

*Implementation of [IGroup](../interfaces/igroup.md).[pauseSounds](../interfaces/igroup.md#pausesounds)*

*Defined in [Group/Group.ts:153](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L153)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `this`

*Implementation of [IGroup](../interfaces/igroup.md).[pauseSounds](../interfaces/igroup.md#pausesounds)*

*Defined in [Group/Group.ts:154](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L154)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** `this`

___
<a id="playallsounds"></a>

###  playAllSounds

▸ **playAllSounds**(): `Promise`<`Event`[]>

*Implementation of [IGroup](../interfaces/igroup.md).[playAllSounds](../interfaces/igroup.md#playallsounds)*

*Defined in [Group/Group.ts:149](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L149)*

**Returns:** `Promise`<`Event`[]>

___
<a id="playsounds"></a>

###  playSounds

▸ **playSounds**(name: *`string`*): `Promise`<`Event`>

▸ **playSounds**(names: *`string`[]*): `Promise`<`Event`[]>

*Implementation of [IGroup](../interfaces/igroup.md).[playSounds](../interfaces/igroup.md#playsounds)*

*Defined in [Group/Group.ts:137](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L137)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `Promise`<`Event`>

*Implementation of [IGroup](../interfaces/igroup.md).[playSounds](../interfaces/igroup.md#playsounds)*

*Defined in [Group/Group.ts:138](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L138)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** `Promise`<`Event`[]>

___
<a id="removeallsounds"></a>

###  removeAllSounds

▸ **removeAllSounds**(): `this`

*Implementation of [IGroup](../interfaces/igroup.md).[removeAllSounds](../interfaces/igroup.md#removeallsounds)*

*Defined in [Group/Group.ts:133](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L133)*

**Returns:** `this`

___
<a id="removesounds"></a>

###  removeSounds

▸ **removeSounds**(name: *`string`*): `this`

▸ **removeSounds**(names: *`string`[]*): `this`

*Implementation of [IGroup](../interfaces/igroup.md).[removeSounds](../interfaces/igroup.md#removesounds)*

*Defined in [Group/Group.ts:109](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L109)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `this`

*Implementation of [IGroup](../interfaces/igroup.md).[removeSounds](../interfaces/igroup.md#removesounds)*

*Defined in [Group/Group.ts:110](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L110)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** `this`

___
<a id="setvolume"></a>

###  setVolume

▸ **setVolume**(value: *`number`*): `this`

*Implementation of [IGroup](../interfaces/igroup.md).[setVolume](../interfaces/igroup.md#setvolume)*

*Defined in [Group/Group.ts:70](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L70)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |

**Returns:** `this`

___
<a id="stopallsounds"></a>

###  stopAllSounds

▸ **stopAllSounds**(): `this`

*Implementation of [IGroup](../interfaces/igroup.md).[stopAllSounds](../interfaces/igroup.md#stopallsounds)*

*Defined in [Group/Group.ts:193](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L193)*

**Returns:** `this`

___
<a id="stopsound"></a>

###  stopSound

▸ **stopSound**(name: *`string`*): `this`

*Defined in [Group/Group.ts:174](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L174)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `this`

___
<a id="stopsounds"></a>

###  stopSounds

▸ **stopSounds**(name: *`string`*): `this`

▸ **stopSounds**(names: *`string`[]*): `this`

*Implementation of [IGroup](../interfaces/igroup.md).[stopSounds](../interfaces/igroup.md#stopsounds)*

*Defined in [Group/Group.ts:178](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L178)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `this`

*Implementation of [IGroup](../interfaces/igroup.md).[stopSounds](../interfaces/igroup.md#stopsounds)*

*Defined in [Group/Group.ts:179](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L179)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** `this`

___
<a id="updateallaudioelementsvolume"></a>

###  updateAllAudioElementsVolume

▸ **updateAllAudioElementsVolume**(): `this`

*Implementation of [IGroup](../interfaces/igroup.md).[updateAllAudioElementsVolume](../interfaces/igroup.md#updateallaudioelementsvolume)*

*Defined in [Group/Group.ts:197](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/Group.ts#L197)*

**Returns:** `this`

___

