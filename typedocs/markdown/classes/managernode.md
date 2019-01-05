[sound-manager](../README.md) > [ManagerNode](../classes/managernode.md)

# Class: ManagerNode

## Hierarchy

**ManagerNode**

## Implements

* [IManagerNode](../interfaces/imanagernode.md)

## Index

### Constructors

* [constructor](managernode.md#constructor)

### Properties

* [__audioContext](managernode.md#__audiocontext)
* [__gainNode](managernode.md#__gainnode)
* [__isWebAudio](managernode.md#__iswebaudio)
* [__volume](managernode.md#__volume)

### Accessors

* [type](managernode.md#type)

### Methods

* [getAudioContext](managernode.md#getaudiocontext)
* [getContextCurrentTime](managernode.md#getcontextcurrenttime)
* [getGainNode](managernode.md#getgainnode)
* [getInputNode](managernode.md#getinputnode)
* [getVolume](managernode.md#getvolume)
* [isWebAudio](managernode.md#iswebaudio)
* [setVolume](managernode.md#setvolume)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ManagerNode**(options?: *[IManagerNodeOptions](../interfaces/imanagernodeoptions.md)*): [ManagerNode](managernode.md)

*Defined in [Node/ManagerNode.ts:26](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [IManagerNodeOptions](../interfaces/imanagernodeoptions.md) |

**Returns:** [ManagerNode](managernode.md)

___

## Properties

<a id="__audiocontext"></a>

### `<Protected>` __audioContext

**● __audioContext**: *`AudioContext` | `null`* =  null

*Defined in [Node/ManagerNode.ts:24](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L24)*

___
<a id="__gainnode"></a>

### `<Protected>` __gainNode

**● __gainNode**: *`GainNode` | `null`* =  null

*Defined in [Node/ManagerNode.ts:26](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L26)*

___
<a id="__iswebaudio"></a>

### `<Protected>` __isWebAudio

**● __isWebAudio**: *`boolean`*

*Defined in [Node/ManagerNode.ts:25](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L25)*

___
<a id="__volume"></a>

### `<Private>` __volume

**● __volume**: *`number`* = 1

*Defined in [Node/ManagerNode.ts:23](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L23)*

___

## Accessors

<a id="type"></a>

###  type

gettype(): [NodeTypes](../enums/nodetypes.md)

*Defined in [Node/ManagerNode.ts:19](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L19)*

**Returns:** [NodeTypes](../enums/nodetypes.md)

___

## Methods

<a id="getaudiocontext"></a>

###  getAudioContext

▸ **getAudioContext**(): `AudioContext`

*Implementation of [IManagerNode](../interfaces/imanagernode.md).[getAudioContext](../interfaces/imanagernode.md#getaudiocontext)*

*Defined in [Node/ManagerNode.ts:45](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L45)*

**Returns:** `AudioContext`

___
<a id="getcontextcurrenttime"></a>

###  getContextCurrentTime

▸ **getContextCurrentTime**(): `number`

*Implementation of [IManagerNode](../interfaces/imanagernode.md).[getContextCurrentTime](../interfaces/imanagernode.md#getcontextcurrenttime)*

*Defined in [Node/ManagerNode.ts:50](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L50)*

**Returns:** `number`

___
<a id="getgainnode"></a>

###  getGainNode

▸ **getGainNode**(): `GainNode`

*Implementation of [IManagerNode](../interfaces/imanagernode.md).[getGainNode](../interfaces/imanagernode.md#getgainnode)*

*Defined in [Node/ManagerNode.ts:54](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L54)*

**Returns:** `GainNode`

___
<a id="getinputnode"></a>

###  getInputNode

▸ **getInputNode**(): `AudioNode`

*Implementation of [IManagerNode](../interfaces/imanagernode.md).[getInputNode](../interfaces/imanagernode.md#getinputnode)*

*Defined in [Node/ManagerNode.ts:59](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L59)*

**Returns:** `AudioNode`

___
<a id="getvolume"></a>

###  getVolume

▸ **getVolume**(): `number`

*Implementation of [IManagerNode](../interfaces/imanagernode.md).[getVolume](../interfaces/imanagernode.md#getvolume)*

*Defined in [Node/ManagerNode.ts:63](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L63)*

**Returns:** `number`

___
<a id="iswebaudio"></a>

###  isWebAudio

▸ **isWebAudio**(): `boolean`

*Implementation of [IManagerNode](../interfaces/imanagernode.md).[isWebAudio](../interfaces/imanagernode.md#iswebaudio)*

*Defined in [Node/ManagerNode.ts:41](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L41)*

**Returns:** `boolean`

___
<a id="setvolume"></a>

###  setVolume

▸ **setVolume**(value: *`number`*): `this`

*Implementation of [IManagerNode](../interfaces/imanagernode.md).[setVolume](../interfaces/imanagernode.md#setvolume)*

*Defined in [Node/ManagerNode.ts:67](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/ManagerNode.ts#L67)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |

**Returns:** `this`

___

