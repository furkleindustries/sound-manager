[sound-manager](../README.md) > [IGroup](../interfaces/igroup.md)

# Interface: IGroup

## Hierarchy

 [IManagerNode](imanagernode.md)

 [IAnalysableNode](ianalysablenode.md)

 [IPanelRegisterableNode](ipanelregisterablenode.md)

**↳ IGroup**

## Implemented by

* [Group](../classes/group.md)

## Index

### Properties

* [__panelRegistered](igroup.md#__panelregistered)
* [sounds](igroup.md#sounds)
* [type](igroup.md#type)

### Methods

* [addSound](igroup.md#addsound)
* [addSounds](igroup.md#addsounds)
* [getAnalyserNode](igroup.md#getanalysernode)
* [getAudioContext](igroup.md#getaudiocontext)
* [getContextCurrentTime](igroup.md#getcontextcurrenttime)
* [getGainNode](igroup.md#getgainnode)
* [getInputNode](igroup.md#getinputnode)
* [getOutputNode](igroup.md#getoutputnode)
* [getSounds](igroup.md#getsounds)
* [getVolume](igroup.md#getvolume)
* [isPanelRegistered](igroup.md#ispanelregistered)
* [isWebAudio](igroup.md#iswebaudio)
* [panelRegister](igroup.md#panelregister)
* [panelUnregister](igroup.md#panelunregister)
* [pauseAllSounds](igroup.md#pauseallsounds)
* [pauseSounds](igroup.md#pausesounds)
* [playAllSounds](igroup.md#playallsounds)
* [playSounds](igroup.md#playsounds)
* [removeAllSounds](igroup.md#removeallsounds)
* [removeSounds](igroup.md#removesounds)
* [setVolume](igroup.md#setvolume)
* [stopAllSounds](igroup.md#stopallsounds)
* [stopSounds](igroup.md#stopsounds)
* [updateAllAudioElementsVolume](igroup.md#updateallaudioelementsvolume)

---

## Properties

<a id="__panelregistered"></a>

###  __panelRegistered

**● __panelRegistered**: *`boolean`*

*Inherited from [IPanelRegisterableNode](ipanelregisterablenode.md).[__panelRegistered](ipanelregisterablenode.md#__panelregistered)*

*Defined in [Node/IPanelRegisterableNode.ts:2](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IPanelRegisterableNode.ts#L2)*

___
<a id="sounds"></a>

###  sounds

**● sounds**: *[ISoundsMap](isoundsmap.md)*

*Defined in [Group/IGroup.ts:18](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L18)*

___
<a id="type"></a>

###  type

**● type**: *[NodeTypes](../enums/nodetypes.md)*

*Inherited from [IManagerNode](imanagernode.md).[type](imanagernode.md#type)*

*Defined in [Node/IManagerNode.ts:6](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IManagerNode.ts#L6)*

___

## Methods

<a id="addsound"></a>

###  addSound

▸ **addSound**(name: *`string`*, sound: *[ISound](isound.md)*): `this`

*Defined in [Group/IGroup.ts:22](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| sound | [ISound](isound.md) |

**Returns:** `this`

___
<a id="addsounds"></a>

###  addSounds

▸ **addSounds**(sounds: *[ISoundsMap](isoundsmap.md)*): `this`

*Defined in [Group/IGroup.ts:23](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sounds | [ISoundsMap](isoundsmap.md) |

**Returns:** `this`

___
<a id="getanalysernode"></a>

###  getAnalyserNode

▸ **getAnalyserNode**(): `AnalyserNode`

*Inherited from [IAnalysableNode](ianalysablenode.md).[getAnalyserNode](ianalysablenode.md#getanalysernode)*

*Defined in [Node/IAnalysableNode.ts:2](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IAnalysableNode.ts#L2)*

**Returns:** `AnalyserNode`

___
<a id="getaudiocontext"></a>

###  getAudioContext

▸ **getAudioContext**(): `AudioContext`

*Inherited from [IManagerNode](imanagernode.md).[getAudioContext](imanagernode.md#getaudiocontext)*

*Defined in [Node/IManagerNode.ts:8](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IManagerNode.ts#L8)*

**Returns:** `AudioContext`

___
<a id="getcontextcurrenttime"></a>

###  getContextCurrentTime

▸ **getContextCurrentTime**(): `number`

*Overrides [IManagerNode](imanagernode.md).[getContextCurrentTime](imanagernode.md#getcontextcurrenttime)*

*Defined in [Group/IGroup.ts:19](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L19)*

**Returns:** `number`

___
<a id="getgainnode"></a>

###  getGainNode

▸ **getGainNode**(): `GainNode`

*Inherited from [IManagerNode](imanagernode.md).[getGainNode](imanagernode.md#getgainnode)*

*Defined in [Node/IManagerNode.ts:10](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IManagerNode.ts#L10)*

**Returns:** `GainNode`

___
<a id="getinputnode"></a>

###  getInputNode

▸ **getInputNode**(): `AudioNode`

*Inherited from [IManagerNode](imanagernode.md).[getInputNode](imanagernode.md#getinputnode)*

*Defined in [Node/IManagerNode.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IManagerNode.ts#L11)*

**Returns:** `AudioNode`

___
<a id="getoutputnode"></a>

###  getOutputNode

▸ **getOutputNode**(): `AnalyserNode`

*Inherited from [IAnalysableNode](ianalysablenode.md).[getOutputNode](ianalysablenode.md#getoutputnode)*

*Defined in [Node/IAnalysableNode.ts:3](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IAnalysableNode.ts#L3)*

**Returns:** `AnalyserNode`

___
<a id="getsounds"></a>

###  getSounds

▸ **getSounds**(name: *`string`*): [ISound](isound.md)

▸ **getSounds**(names: *`string`[]*): [ISound](isound.md)[]

*Defined in [Group/IGroup.ts:20](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** [ISound](isound.md)

*Defined in [Group/IGroup.ts:21](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** [ISound](isound.md)[]

___
<a id="getvolume"></a>

###  getVolume

▸ **getVolume**(): `number`

*Inherited from [IManagerNode](imanagernode.md).[getVolume](imanagernode.md#getvolume)*

*Defined in [Node/IManagerNode.ts:12](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IManagerNode.ts#L12)*

**Returns:** `number`

___
<a id="ispanelregistered"></a>

###  isPanelRegistered

▸ **isPanelRegistered**(): `boolean`

*Inherited from [IPanelRegisterableNode](ipanelregisterablenode.md).[isPanelRegistered](ipanelregisterablenode.md#ispanelregistered)*

*Defined in [Node/IPanelRegisterableNode.ts:3](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IPanelRegisterableNode.ts#L3)*

**Returns:** `boolean`

___
<a id="iswebaudio"></a>

###  isWebAudio

▸ **isWebAudio**(): `boolean`

*Inherited from [IManagerNode](imanagernode.md).[isWebAudio](imanagernode.md#iswebaudio)*

*Defined in [Node/IManagerNode.ts:7](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IManagerNode.ts#L7)*

**Returns:** `boolean`

___
<a id="panelregister"></a>

###  panelRegister

▸ **panelRegister**(): [IPanelRegisterableNode](ipanelregisterablenode.md)

*Inherited from [IPanelRegisterableNode](ipanelregisterablenode.md).[panelRegister](ipanelregisterablenode.md#panelregister)*

*Defined in [Node/IPanelRegisterableNode.ts:4](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IPanelRegisterableNode.ts#L4)*

**Returns:** [IPanelRegisterableNode](ipanelregisterablenode.md)

___
<a id="panelunregister"></a>

###  panelUnregister

▸ **panelUnregister**(): [IPanelRegisterableNode](ipanelregisterablenode.md)

*Inherited from [IPanelRegisterableNode](ipanelregisterablenode.md).[panelUnregister](ipanelregisterablenode.md#panelunregister)*

*Defined in [Node/IPanelRegisterableNode.ts:5](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IPanelRegisterableNode.ts#L5)*

**Returns:** [IPanelRegisterableNode](ipanelregisterablenode.md)

___
<a id="pauseallsounds"></a>

###  pauseAllSounds

▸ **pauseAllSounds**(): `this`

*Defined in [Group/IGroup.ts:32](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L32)*

**Returns:** `this`

___
<a id="pausesounds"></a>

###  pauseSounds

▸ **pauseSounds**(name: *`string`*): `this`

▸ **pauseSounds**(names: *`string`[]*): `this`

*Defined in [Group/IGroup.ts:30](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `this`

*Defined in [Group/IGroup.ts:31](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** `this`

___
<a id="playallsounds"></a>

###  playAllSounds

▸ **playAllSounds**(): `Promise`<`Event`[]>

*Defined in [Group/IGroup.ts:29](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L29)*

**Returns:** `Promise`<`Event`[]>

___
<a id="playsounds"></a>

###  playSounds

▸ **playSounds**(name: *`string`*): `Promise`<`Event`>

▸ **playSounds**(names: *`string`[]*): `Promise`<`Event`[]>

*Defined in [Group/IGroup.ts:27](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L27)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `Promise`<`Event`>

*Defined in [Group/IGroup.ts:28](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** `Promise`<`Event`[]>

___
<a id="removeallsounds"></a>

###  removeAllSounds

▸ **removeAllSounds**(): `this`

*Defined in [Group/IGroup.ts:26](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L26)*

**Returns:** `this`

___
<a id="removesounds"></a>

###  removeSounds

▸ **removeSounds**(names: *`string`*): `this`

▸ **removeSounds**(names: *`string`[]*): `this`

*Defined in [Group/IGroup.ts:24](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string` |

**Returns:** `this`

*Defined in [Group/IGroup.ts:25](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** `this`

___
<a id="setvolume"></a>

###  setVolume

▸ **setVolume**(value: *`number`*): [IManagerNode](imanagernode.md)

*Inherited from [IManagerNode](imanagernode.md).[setVolume](imanagernode.md#setvolume)*

*Defined in [Node/IManagerNode.ts:13](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IManagerNode.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |

**Returns:** [IManagerNode](imanagernode.md)

___
<a id="stopallsounds"></a>

###  stopAllSounds

▸ **stopAllSounds**(): `this`

*Defined in [Group/IGroup.ts:35](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L35)*

**Returns:** `this`

___
<a id="stopsounds"></a>

###  stopSounds

▸ **stopSounds**(name: *`string`*): `this`

▸ **stopSounds**(names: *`string`[]*): `this`

*Defined in [Group/IGroup.ts:33](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L33)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `this`

*Defined in [Group/IGroup.ts:34](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** `this`

___
<a id="updateallaudioelementsvolume"></a>

###  updateAllAudioElementsVolume

▸ **updateAllAudioElementsVolume**(): `this`

*Defined in [Group/IGroup.ts:36](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/IGroup.ts#L36)*

**Returns:** `this`

___

