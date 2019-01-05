[sound-manager](../README.md) > [ISound](../interfaces/isound.md)

# Interface: ISound

## Hierarchy

 [IManagerNode](imanagernode.md)

 [IPanelRegisterableNode](ipanelregisterablenode.md)

**↳ ISound**

## Implemented by

* [Sound](../classes/sound.md)

## Index

### Properties

* [__fadeGainNode](isound.md#__fadegainnode)
* [__fadeOverride](isound.md#__fadeoverride)
* [__loopOverride](isound.md#__loopoverride)
* [__panelRegistered](isound.md#__panelregistered)
* [__promise](isound.md#__promise)
* [__rejectOnStop](isound.md#__rejectonstop)
* [__sourceNode](isound.md#__sourcenode)
* [__startedTime](isound.md#__startedtime)
* [type](isound.md#type)

### Methods

* [fastForward](isound.md#fastforward)
* [getAudioContext](isound.md#getaudiocontext)
* [getContextCurrentTime](isound.md#getcontextcurrenttime)
* [getDuration](isound.md#getduration)
* [getFade](isound.md#getfade)
* [getFadeGainNode](isound.md#getfadegainnode)
* [getFadeVolume](isound.md#getfadevolume)
* [getGainNode](isound.md#getgainnode)
* [getGroupVolume](isound.md#getgroupvolume)
* [getInputNode](isound.md#getinputnode)
* [getLoop](isound.md#getloop)
* [getOutputNode](isound.md#getoutputnode)
* [getSourceNode](isound.md#getsourcenode)
* [getTrackPosition](isound.md#gettrackposition)
* [getVolume](isound.md#getvolume)
* [isPanelRegistered](isound.md#ispanelregistered)
* [isPlaying](isound.md#isplaying)
* [isWebAudio](isound.md#iswebaudio)
* [panelRegister](isound.md#panelregister)
* [panelUnregister](isound.md#panelunregister)
* [pause](isound.md#pause)
* [play](isound.md#play)
* [rewind](isound.md#rewind)
* [setFade](isound.md#setfade)
* [setLoop](isound.md#setloop)
* [setTrackPosition](isound.md#settrackposition)
* [setVolume](isound.md#setvolume)
* [stop](isound.md#stop)
* [updateAudioElementVolume](isound.md#updateaudioelementvolume)

---

## Properties

<a id="__fadegainnode"></a>

###  __fadeGainNode

**● __fadeGainNode**: *`GainNode` | `null`*

*Defined in [Sound/ISound.ts:33](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L33)*

___
<a id="__fadeoverride"></a>

### `<Optional>` __fadeOverride

**● __fadeOverride**: *[IFade](ifade.md)*

*Defined in [Sound/ISound.ts:34](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L34)*

___
<a id="__loopoverride"></a>

### `<Optional>` __loopOverride

**● __loopOverride**: *`undefined` | `false` | `true`*

*Defined in [Sound/ISound.ts:35](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L35)*

___
<a id="__panelregistered"></a>

###  __panelRegistered

**● __panelRegistered**: *`boolean`*

*Inherited from [IPanelRegisterableNode](ipanelregisterablenode.md).[__panelRegistered](ipanelregisterablenode.md#__panelregistered)*

*Defined in [Node/IPanelRegisterableNode.ts:2](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IPanelRegisterableNode.ts#L2)*

___
<a id="__promise"></a>

###  __promise

**● __promise**: *`Promise`<`Event`> | `null`*

*Defined in [Sound/ISound.ts:37](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L37)*

___
<a id="__rejectonstop"></a>

###  __rejectOnStop

**● __rejectOnStop**: *`function`*

*Defined in [Sound/ISound.ts:38](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L38)*

#### Type declaration
▸(): `void`

**Returns:** `void`

___
<a id="__sourcenode"></a>

###  __sourceNode

**● __sourceNode**: *`AudioBufferSourceNode` | `null`*

*Defined in [Sound/ISound.ts:32](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L32)*

___
<a id="__startedtime"></a>

###  __startedTime

**● __startedTime**: *`number`*

*Defined in [Sound/ISound.ts:36](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L36)*

___
<a id="type"></a>

###  type

**● type**: *[NodeTypes](../enums/nodetypes.md)*

*Inherited from [IManagerNode](imanagernode.md).[type](imanagernode.md#type)*

*Defined in [Node/IManagerNode.ts:6](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IManagerNode.ts#L6)*

___

## Methods

<a id="fastforward"></a>

###  fastForward

▸ **fastForward**(seconds: *`number`*): `this`

*Defined in [Sound/ISound.ts:28](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| seconds | `number` |

**Returns:** `this`

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

*Defined in [Sound/ISound.ts:15](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L15)*

**Returns:** `number`

___
<a id="getduration"></a>

###  getDuration

▸ **getDuration**(): `number`

*Defined in [Sound/ISound.ts:18](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L18)*

**Returns:** `number`

___
<a id="getfade"></a>

###  getFade

▸ **getFade**(): [IFade](ifade.md) | `null`

*Defined in [Sound/ISound.ts:22](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L22)*

**Returns:** [IFade](ifade.md) | `null`

___
<a id="getfadegainnode"></a>

###  getFadeGainNode

▸ **getFadeGainNode**(): `GainNode`

*Defined in [Sound/ISound.ts:13](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L13)*

**Returns:** `GainNode`

___
<a id="getfadevolume"></a>

###  getFadeVolume

▸ **getFadeVolume**(): `number`

*Defined in [Sound/ISound.ts:30](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L30)*

**Returns:** `number`

___
<a id="getgainnode"></a>

###  getGainNode

▸ **getGainNode**(): `GainNode`

*Inherited from [IManagerNode](imanagernode.md).[getGainNode](imanagernode.md#getgainnode)*

*Defined in [Node/IManagerNode.ts:10](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IManagerNode.ts#L10)*

**Returns:** `GainNode`

___
<a id="getgroupvolume"></a>

###  getGroupVolume

▸ **getGroupVolume**(): `number`

*Defined in [Sound/ISound.ts:29](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L29)*

**Returns:** `number`

___
<a id="getinputnode"></a>

###  getInputNode

▸ **getInputNode**(): `AudioNode`

*Inherited from [IManagerNode](imanagernode.md).[getInputNode](imanagernode.md#getinputnode)*

*Defined in [Node/IManagerNode.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/IManagerNode.ts#L11)*

**Returns:** `AudioNode`

___
<a id="getloop"></a>

###  getLoop

▸ **getLoop**(): `boolean`

*Defined in [Sound/ISound.ts:20](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L20)*

**Returns:** `boolean`

___
<a id="getoutputnode"></a>

###  getOutputNode

▸ **getOutputNode**(): `GainNode`

*Defined in [Sound/ISound.ts:14](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L14)*

**Returns:** `GainNode`

___
<a id="getsourcenode"></a>

###  getSourceNode

▸ **getSourceNode**(): `AudioBufferSourceNode`

*Defined in [Sound/ISound.ts:12](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L12)*

**Returns:** `AudioBufferSourceNode`

___
<a id="gettrackposition"></a>

###  getTrackPosition

▸ **getTrackPosition**(): `number`

*Defined in [Sound/ISound.ts:16](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L16)*

**Returns:** `number`

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
<a id="isplaying"></a>

###  isPlaying

▸ **isPlaying**(): `boolean`

*Defined in [Sound/ISound.ts:19](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L19)*

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
<a id="pause"></a>

###  pause

▸ **pause**(): `this`

*Defined in [Sound/ISound.ts:25](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L25)*

**Returns:** `this`

___
<a id="play"></a>

###  play

▸ **play**(fadeOverride?: *[IFade](ifade.md) | `null`*): `Promise`<`Event`>

*Defined in [Sound/ISound.ts:24](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` fadeOverride | [IFade](ifade.md) | `null` |

**Returns:** `Promise`<`Event`>

___
<a id="rewind"></a>

###  rewind

▸ **rewind**(seconds: *`number`*): `this`

*Defined in [Sound/ISound.ts:27](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L27)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| seconds | `number` |

**Returns:** `this`

___
<a id="setfade"></a>

###  setFade

▸ **setFade**(fade: *[IFade](ifade.md) | `null`*): `this`

*Defined in [Sound/ISound.ts:23](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fade | [IFade](ifade.md) | `null` |

**Returns:** `this`

___
<a id="setloop"></a>

###  setLoop

▸ **setLoop**(loop: *`boolean`*): `this`

*Defined in [Sound/ISound.ts:21](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| loop | `boolean` |

**Returns:** `this`

___
<a id="settrackposition"></a>

###  setTrackPosition

▸ **setTrackPosition**(seconds: *`number`*): `this`

*Defined in [Sound/ISound.ts:17](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| seconds | `number` |

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
<a id="stop"></a>

###  stop

▸ **stop**(): `this`

*Defined in [Sound/ISound.ts:26](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L26)*

**Returns:** `this`

___
<a id="updateaudioelementvolume"></a>

###  updateAudioElementVolume

▸ **updateAudioElementVolume**(): `this`

*Defined in [Sound/ISound.ts:31](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/ISound.ts#L31)*

**Returns:** `this`

___

