[sound-manager](../README.md) > [Sound](../classes/sound.md)

# Class: Sound

## Hierarchy

 `PanelRegisterableNode`<[ManagerNode](managernode.md), `this`> & [ManagerNode](managernode.md)<`this`>

**↳ Sound**

## Implements

* [ISound](../interfaces/isound.md)

## Index

### Constructors

* [constructor](sound.md#constructor)

### Properties

* [__audioElement](sound.md#__audioelement)
* [__fade](sound.md#__fade)
* [__fadeGainNode](sound.md#__fadegainnode)
* [__fadeOverride](sound.md#__fadeoverride)
* [__loopOverride](sound.md#__loopoverride)
* [__pausedTime](sound.md#__pausedtime)
* [__playing](sound.md#__playing)
* [__promise](sound.md#__promise)
* [__sourceNode](sound.md#__sourcenode)
* [__startedTime](sound.md#__startedtime)

### Accessors

* [type](sound.md#type)

### Methods

* [__rejectOnStop](sound.md#__rejectonstop)
* [fastForward](sound.md#fastforward)
* [getDuration](sound.md#getduration)
* [getFade](sound.md#getfade)
* [getFadeGainNode](sound.md#getfadegainnode)
* [getFadeVolume](sound.md#getfadevolume)
* [getGroupVolume](sound.md#getgroupvolume)
* [getInputNode](sound.md#getinputnode)
* [getLoop](sound.md#getloop)
* [getManagerVolume](sound.md#getmanagervolume)
* [getOutputNode](sound.md#getoutputnode)
* [getSourceNode](sound.md#getsourcenode)
* [getTrackPosition](sound.md#gettrackposition)
* [isPlaying](sound.md#isplaying)
* [pause](sound.md#pause)
* [play](sound.md#play)
* [rewind](sound.md#rewind)
* [setFade](sound.md#setfade)
* [setLoop](sound.md#setloop)
* [setTrackPosition](sound.md#settrackposition)
* [setVolume](sound.md#setvolume)
* [stop](sound.md#stop)
* [updateAudioElementVolume](sound.md#updateaudioelementvolume)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Sound**(options: *[ISoundOptions](../interfaces/isoundoptions.md)*): [Sound](sound.md)

*Defined in [Sound/Sound.ts:90](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L90)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [ISoundOptions](../interfaces/isoundoptions.md) |

**Returns:** [Sound](sound.md)

___

## Properties

<a id="__audioelement"></a>

### `<Private>` __audioElement

**● __audioElement**: *`HTMLAudioElement` | `null`* =  null

*Defined in [Sound/Sound.ts:73](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L73)*

___
<a id="__fade"></a>

### `<Private>` __fade

**● __fade**: *[IFade](../interfaces/ifade.md) | `null`* =  null

*Defined in [Sound/Sound.ts:74](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L74)*

___
<a id="__fadegainnode"></a>

###  __fadeGainNode

**● __fadeGainNode**: *`GainNode` | `null`* =  null

*Implementation of [ISound](../interfaces/isound.md).[__fadeGainNode](../interfaces/isound.md#__fadegainnode)*

*Defined in [Sound/Sound.ts:82](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L82)*

___
<a id="__fadeoverride"></a>

### `<Optional>` __fadeOverride

**● __fadeOverride**: *[IFade](../interfaces/ifade.md)*

*Implementation of [ISound](../interfaces/isound.md).[__fadeOverride](../interfaces/isound.md#__fadeoverride)*

*Defined in [Sound/Sound.ts:83](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L83)*

___
<a id="__loopoverride"></a>

### `<Optional>` __loopOverride

**● __loopOverride**: *`undefined` | `false` | `true`*

*Implementation of [ISound](../interfaces/isound.md).[__loopOverride](../interfaces/isound.md#__loopoverride)*

*Defined in [Sound/Sound.ts:84](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L84)*

___
<a id="__pausedtime"></a>

### `<Private>` __pausedTime

**● __pausedTime**: *`number`* = 0

*Defined in [Sound/Sound.ts:75](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L75)*

___
<a id="__playing"></a>

### `<Private>` __playing

**● __playing**: *`boolean`* = false

*Defined in [Sound/Sound.ts:76](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L76)*

___
<a id="__promise"></a>

###  __promise

**● __promise**: *`Promise`<`Event`> | `null`* =  null

*Implementation of [ISound](../interfaces/isound.md).[__promise](../interfaces/isound.md#__promise)*

*Defined in [Sound/Sound.ts:85](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L85)*

___
<a id="__sourcenode"></a>

###  __sourceNode

**● __sourceNode**: *`AudioBufferSourceNode` | `null`* =  null

*Implementation of [ISound](../interfaces/isound.md).[__sourceNode](../interfaces/isound.md#__sourcenode)*

*Defined in [Sound/Sound.ts:86](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L86)*

___
<a id="__startedtime"></a>

###  __startedTime

**● __startedTime**: *`number`* = 0

*Implementation of [ISound](../interfaces/isound.md).[__startedTime](../interfaces/isound.md#__startedtime)*

*Defined in [Sound/Sound.ts:87](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L87)*

___

## Accessors

<a id="type"></a>

###  type

gettype(): [NodeTypes](../enums/nodetypes.md)

*Defined in [Sound/Sound.ts:69](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L69)*

**Returns:** [NodeTypes](../enums/nodetypes.md)

___

## Methods

<a id="__rejectonstop"></a>

###  __rejectOnStop

▸ **__rejectOnStop**(): `void`

*Defined in [Sound/Sound.ts:90](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L90)*

**Returns:** `void`

___
<a id="fastforward"></a>

###  fastForward

▸ **fastForward**(seconds: *`number`*): `this`

*Implementation of [ISound](../interfaces/isound.md).[fastForward](../interfaces/isound.md#fastforward)*

*Defined in [Sound/Sound.ts:313](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L313)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| seconds | `number` |

**Returns:** `this`

___
<a id="getduration"></a>

###  getDuration

▸ **getDuration**(): `number`

*Implementation of [ISound](../interfaces/isound.md).[getDuration](../interfaces/isound.md#getduration)*

*Defined in [Sound/Sound.ts:182](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L182)*

**Returns:** `number`

___
<a id="getfade"></a>

###  getFade

▸ **getFade**(): `null` | [IFade](../interfaces/ifade.md)

*Implementation of [ISound](../interfaces/isound.md).[getFade](../interfaces/isound.md#getfade)*

*Defined in [Sound/Sound.ts:213](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L213)*

**Returns:** `null` | [IFade](../interfaces/ifade.md)

___
<a id="getfadegainnode"></a>

###  getFadeGainNode

▸ **getFadeGainNode**(): `GainNode`

*Implementation of [ISound](../interfaces/isound.md).[getFadeGainNode](../interfaces/isound.md#getfadegainnode)*

*Defined in [Sound/Sound.ts:146](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L146)*

**Returns:** `GainNode`

___
<a id="getfadevolume"></a>

###  getFadeVolume

▸ **getFadeVolume**(): `number`

*Implementation of [ISound](../interfaces/isound.md).[getFadeVolume](../interfaces/isound.md#getfadevolume)*

*Defined in [Sound/Sound.ts:329](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L329)*

**Returns:** `number`

___
<a id="getgroupvolume"></a>

###  getGroupVolume

▸ **getGroupVolume**(): `number`

*Implementation of [ISound](../interfaces/isound.md).[getGroupVolume](../interfaces/isound.md#getgroupvolume)*

*Defined in [Sound/Sound.ts:88](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L88)*

**Returns:** `number`

___
<a id="getinputnode"></a>

###  getInputNode

▸ **getInputNode**(): `AudioBufferSourceNode`

*Implementation of [ISound](../interfaces/isound.md).[getInputNode](../interfaces/isound.md#getinputnode)*

*Defined in [Sound/Sound.ts:123](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L123)*

**Returns:** `AudioBufferSourceNode`

___
<a id="getloop"></a>

###  getLoop

▸ **getLoop**(): `boolean`

*Implementation of [ISound](../interfaces/isound.md).[getLoop](../interfaces/isound.md#getloop)*

*Defined in [Sound/Sound.ts:203](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L203)*

**Returns:** `boolean`

___
<a id="getmanagervolume"></a>

### `<Private>` getManagerVolume

▸ **getManagerVolume**(): `never`

*Defined in [Sound/Sound.ts:78](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L78)*

**Returns:** `never`

___
<a id="getoutputnode"></a>

###  getOutputNode

▸ **getOutputNode**(): `GainNode`

*Implementation of [ISound](../interfaces/isound.md).[getOutputNode](../interfaces/isound.md#getoutputnode)*

*Defined in [Sound/Sound.ts:137](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L137)*

**Returns:** `GainNode`

___
<a id="getsourcenode"></a>

###  getSourceNode

▸ **getSourceNode**(): `AudioBufferSourceNode`

*Implementation of [ISound](../interfaces/isound.md).[getSourceNode](../interfaces/isound.md#getsourcenode)*

*Defined in [Sound/Sound.ts:141](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L141)*

**Returns:** `AudioBufferSourceNode`

___
<a id="gettrackposition"></a>

###  getTrackPosition

▸ **getTrackPosition**(): `number`

*Implementation of [ISound](../interfaces/isound.md).[getTrackPosition](../interfaces/isound.md#gettrackposition)*

*Defined in [Sound/Sound.ts:151](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L151)*

**Returns:** `number`

___
<a id="isplaying"></a>

###  isPlaying

▸ **isPlaying**(): `boolean`

*Implementation of [ISound](../interfaces/isound.md).[isPlaying](../interfaces/isound.md#isplaying)*

*Defined in [Sound/Sound.ts:199](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L199)*

**Returns:** `boolean`

___
<a id="pause"></a>

###  pause

▸ **pause**(): `this`

*Implementation of [ISound](../interfaces/isound.md).[pause](../interfaces/isound.md#pause)*

*Defined in [Sound/Sound.ts:265](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L265)*

**Returns:** `this`

___
<a id="play"></a>

###  play

▸ **play**(fadeOverride?: *[IFade](../interfaces/ifade.md) | `null`*, loopOverride?: *`undefined` | `false` | `true`*): `Promise`<`Event`>

*Defined in [Sound/Sound.ts:232](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L232)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` fadeOverride | [IFade](../interfaces/ifade.md) | `null` |
| `Optional` loopOverride | `undefined` | `false` | `true` |

**Returns:** `Promise`<`Event`>

___
<a id="rewind"></a>

###  rewind

▸ **rewind**(seconds: *`number`*): `this`

*Implementation of [ISound](../interfaces/isound.md).[rewind](../interfaces/isound.md#rewind)*

*Defined in [Sound/Sound.ts:309](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L309)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| seconds | `number` |

**Returns:** `this`

___
<a id="setfade"></a>

###  setFade

▸ **setFade**(fade: *[IFade](../interfaces/ifade.md) | `null`*): `this`

*Implementation of [ISound](../interfaces/isound.md).[setFade](../interfaces/isound.md#setfade)*

*Defined in [Sound/Sound.ts:217](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L217)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fade | [IFade](../interfaces/ifade.md) | `null` |

**Returns:** `this`

___
<a id="setloop"></a>

###  setLoop

▸ **setLoop**(loop: *`boolean`*): `this`

*Implementation of [ISound](../interfaces/isound.md).[setLoop](../interfaces/isound.md#setloop)*

*Defined in [Sound/Sound.ts:222](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L222)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| loop | `boolean` |

**Returns:** `this`

___
<a id="settrackposition"></a>

###  setTrackPosition

▸ **setTrackPosition**(seconds: *`number`*): `this`

*Implementation of [ISound](../interfaces/isound.md).[setTrackPosition](../interfaces/isound.md#settrackposition)*

*Defined in [Sound/Sound.ts:163](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L163)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| seconds | `number` |

**Returns:** `this`

___
<a id="setvolume"></a>

###  setVolume

▸ **setVolume**(value: *`number`*): `this`

*Implementation of [ISound](../interfaces/isound.md).[setVolume](../interfaces/isound.md#setvolume)*

*Defined in [Sound/Sound.ts:127](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L127)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |

**Returns:** `this`

___
<a id="stop"></a>

###  stop

▸ **stop**(): `this`

*Implementation of [ISound](../interfaces/isound.md).[stop](../interfaces/isound.md#stop)*

*Defined in [Sound/Sound.ts:292](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L292)*

**Returns:** `this`

___
<a id="updateaudioelementvolume"></a>

###  updateAudioElementVolume

▸ **updateAudioElementVolume**(): `this`

*Implementation of [ISound](../interfaces/isound.md).[updateAudioElementVolume](../interfaces/isound.md#updateaudioelementvolume)*

*Defined in [Sound/Sound.ts:317](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/Sound.ts#L317)*

**Returns:** `this`

___

