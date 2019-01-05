[sound-manager](../README.md) > [IManagerNode](../interfaces/imanagernode.md)

# Interface: IManagerNode

## Hierarchy

**IManagerNode**

↳  [ISound](isound.md)

↳  [IGroup](igroup.md)

↳  [IManager](imanager.md)

## Implemented by

* [ManagerNode](../classes/managernode.md)

## Index

### Properties

* [type](imanagernode.md#type)

### Methods

* [getAudioContext](imanagernode.md#getaudiocontext)
* [getContextCurrentTime](imanagernode.md#getcontextcurrenttime)
* [getGainNode](imanagernode.md#getgainnode)
* [getInputNode](imanagernode.md#getinputnode)
* [getVolume](imanagernode.md#getvolume)
* [isWebAudio](imanagernode.md#iswebaudio)
* [setVolume](imanagernode.md#setvolume)

---

## Properties

<a id="type"></a>

###  type

**● type**: *[NodeTypes](../enums/nodetypes.md)*

*Defined in [Node/IManagerNode.ts:6](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L6)*

___

## Methods

<a id="getaudiocontext"></a>

###  getAudioContext

▸ **getAudioContext**(): `AudioContext`

*Defined in [Node/IManagerNode.ts:8](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L8)*

**Returns:** `AudioContext`

___
<a id="getcontextcurrenttime"></a>

###  getContextCurrentTime

▸ **getContextCurrentTime**(): `number`

*Defined in [Node/IManagerNode.ts:9](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L9)*

**Returns:** `number`

___
<a id="getgainnode"></a>

###  getGainNode

▸ **getGainNode**(): `GainNode`

*Defined in [Node/IManagerNode.ts:10](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L10)*

**Returns:** `GainNode`

___
<a id="getinputnode"></a>

###  getInputNode

▸ **getInputNode**(): `AudioNode`

*Defined in [Node/IManagerNode.ts:11](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L11)*

**Returns:** `AudioNode`

___
<a id="getvolume"></a>

###  getVolume

▸ **getVolume**(): `number`

*Defined in [Node/IManagerNode.ts:12](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L12)*

**Returns:** `number`

___
<a id="iswebaudio"></a>

###  isWebAudio

▸ **isWebAudio**(): `boolean`

*Defined in [Node/IManagerNode.ts:7](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L7)*

**Returns:** `boolean`

___
<a id="setvolume"></a>

###  setVolume

▸ **setVolume**(value: *`number`*): [IManagerNode](imanagernode.md)

*Defined in [Node/IManagerNode.ts:13](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |

**Returns:** [IManagerNode](imanagernode.md)

___

