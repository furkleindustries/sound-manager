[sound-manager](../README.md) > [IManager](../interfaces/imanager.md)

# Interface: IManager

## Hierarchy

 [IManagerNode](imanagernode.md)

 [INodeCollectionSubmanager](inodecollectionsubmanager.md)

 [INodePlaySubmanager](inodeplaysubmanager.md)

 [IVolumePanelSubmanager](ivolumepanelsubmanager.md)

 [IAnalysableNode](ianalysablenode.md)

**↳ IManager**

## Implemented by

* [Manager](../classes/manager.md)

## Index

### Properties

* [__groups](imanager.md#__groups)
* [__playlists](imanager.md#__playlists)
* [__volumePanelElement](imanager.md#__volumepanelelement)
* [groups](imanager.md#groups)
* [playlists](imanager.md#playlists)
* [type](imanager.md#type)

### Methods

* [addGroup](imanager.md#addgroup)
* [addGroups](imanager.md#addgroups)
* [addPlaylist](imanager.md#addplaylist)
* [addPlaylists](imanager.md#addplaylists)
* [addSound](imanager.md#addsound)
* [addSounds](imanager.md#addsounds)
* [generateVolumePanelElement](imanager.md#generatevolumepanelelement)
* [getAnalyserNode](imanager.md#getanalysernode)
* [getAudioContext](imanager.md#getaudiocontext)
* [getContextCurrentTime](imanager.md#getcontextcurrenttime)
* [getGainNode](imanager.md#getgainnode)
* [getGroupVolume](imanager.md#getgroupvolume)
* [getGroups](imanager.md#getgroups)
* [getInputNode](imanager.md#getinputnode)
* [getOutputNode](imanager.md#getoutputnode)
* [getPlaylists](imanager.md#getplaylists)
* [getSoundVolume](imanager.md#getsoundvolume)
* [getSounds](imanager.md#getsounds)
* [getVolume](imanager.md#getvolume)
* [initializeDefaultGroup](imanager.md#initializedefaultgroup)
* [isWebAudio](imanager.md#iswebaudio)
* [pauseAllSounds](imanager.md#pauseallsounds)
* [pauseSounds](imanager.md#pausesounds)
* [playAllSounds](imanager.md#playallsounds)
* [playGroups](imanager.md#playgroups)
* [playPlaylist](imanager.md#playplaylist)
* [playPlaylists](imanager.md#playplaylists)
* [playSounds](imanager.md#playsounds)
* [removeAllGroups](imanager.md#removeallgroups)
* [removeAllSounds](imanager.md#removeallsounds)
* [removeGroups](imanager.md#removegroups)
* [removeSounds](imanager.md#removesounds)
* [setGroupVolume](imanager.md#setgroupvolume)
* [setSoundVolume](imanager.md#setsoundvolume)
* [setVolume](imanager.md#setvolume)
* [stopAllSounds](imanager.md#stopallsounds)
* [stopPlaylists](imanager.md#stopplaylists)
* [stopSounds](imanager.md#stopsounds)
* [updateAllAudioElementsVolume](imanager.md#updateallaudioelementsvolume)
* [updateVolumePanelElement](imanager.md#updatevolumepanelelement)
* [volumePanelDeregister](imanager.md#volumepanelderegister)
* [volumePanelRegister](imanager.md#volumepanelregister)

---

## Properties

<a id="__groups"></a>

###  __groups

**● __groups**: *[IGroupsMap](igroupsmap.md)*

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[__groups](inodecollectionsubmanager.md#__groups)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:12](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L12)*

___
<a id="__playlists"></a>

###  __playlists

**● __playlists**: *[IPlaylistsMap](iplaylistsmap.md)*

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[__playlists](inodeplaysubmanager.md#__playlists)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:8](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L8)*

___
<a id="__volumepanelelement"></a>

###  __volumePanelElement

**● __volumePanelElement**: *`HTMLElement` | `null`*

*Inherited from [IVolumePanelSubmanager](ivolumepanelsubmanager.md).[__volumePanelElement](ivolumepanelsubmanager.md#__volumepanelelement)*

*Defined in [Manager/Submanagers/IVolumePanelSubmanager.ts:6](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/IVolumePanelSubmanager.ts#L6)*

___
<a id="groups"></a>

###  groups

**● groups**: *[IGroupsMap](igroupsmap.md)*

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[groups](inodecollectionsubmanager.md#groups)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:11](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L11)*

___
<a id="playlists"></a>

###  playlists

**● playlists**: *[IPlaylistsMap](iplaylistsmap.md)*

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[playlists](inodeplaysubmanager.md#playlists)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:9](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L9)*

___
<a id="type"></a>

###  type

**● type**: *[NodeTypes](../enums/nodetypes.md)*

*Inherited from [IManagerNode](imanagernode.md).[type](imanagernode.md#type)*

*Defined in [Node/IManagerNode.ts:6](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L6)*

___

## Methods

<a id="addgroup"></a>

###  addGroup

▸ **addGroup**(name: *`string`*, options?: *[IGroupOptions](igroupoptions.md)*): [IGroup](igroup.md)

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[addGroup](inodecollectionsubmanager.md#addgroup)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:13](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L13)*

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

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[addGroups](inodecollectionsubmanager.md#addgroups)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:14](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| groups | [IGroupsMap](igroupsmap.md) |

**Returns:** `this`

___
<a id="addplaylist"></a>

###  addPlaylist

▸ **addPlaylist**(name: *`string`*, options: *[IPlaylistOptions](iplaylistoptions.md)*): [IPlaylist](iplaylist.md)

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[addPlaylist](inodeplaysubmanager.md#addplaylist)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:21](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| options | [IPlaylistOptions](iplaylistoptions.md) |

**Returns:** [IPlaylist](iplaylist.md)

___
<a id="addplaylists"></a>

###  addPlaylists

▸ **addPlaylists**(playlists: *[IPlaylistsMap](iplaylistsmap.md)*): `this`

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[addPlaylists](inodeplaysubmanager.md#addplaylists)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:22](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| playlists | [IPlaylistsMap](iplaylistsmap.md) |

**Returns:** `this`

___
<a id="addsound"></a>

###  addSound

▸ **addSound**(name: *`string`*, options: *[ICreateSoundOptions](icreatesoundoptions.md)*, groupName?: *`undefined` | `string`*): `Promise`<[ISound](isound.md)>

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[addSound](inodecollectionsubmanager.md#addsound)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:23](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L23)*

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

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[addSounds](inodecollectionsubmanager.md#addsounds)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:28](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sounds | [ISoundsMap](isoundsmap.md) |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

___
<a id="generatevolumepanelelement"></a>

###  generateVolumePanelElement

▸ **generateVolumePanelElement**(): `HTMLElement`

*Inherited from [IVolumePanelSubmanager](ivolumepanelsubmanager.md).[generateVolumePanelElement](ivolumepanelsubmanager.md#generatevolumepanelelement)*

*Defined in [Manager/Submanagers/IVolumePanelSubmanager.ts:7](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/IVolumePanelSubmanager.ts#L7)*

**Returns:** `HTMLElement`

___
<a id="getanalysernode"></a>

###  getAnalyserNode

▸ **getAnalyserNode**(): `AnalyserNode`

*Inherited from [IAnalysableNode](ianalysablenode.md).[getAnalyserNode](ianalysablenode.md#getanalysernode)*

*Defined in [Node/IAnalysableNode.ts:2](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IAnalysableNode.ts#L2)*

**Returns:** `AnalyserNode`

___
<a id="getaudiocontext"></a>

###  getAudioContext

▸ **getAudioContext**(): `AudioContext`

*Inherited from [IManagerNode](imanagernode.md).[getAudioContext](imanagernode.md#getaudiocontext)*

*Defined in [Node/IManagerNode.ts:8](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L8)*

**Returns:** `AudioContext`

___
<a id="getcontextcurrenttime"></a>

###  getContextCurrentTime

▸ **getContextCurrentTime**(): `number`

*Inherited from [IManagerNode](imanagernode.md).[getContextCurrentTime](imanagernode.md#getcontextcurrenttime)*

*Defined in [Node/IManagerNode.ts:9](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L9)*

**Returns:** `number`

___
<a id="getgainnode"></a>

###  getGainNode

▸ **getGainNode**(): `GainNode`

*Inherited from [IManagerNode](imanagernode.md).[getGainNode](imanagernode.md#getgainnode)*

*Defined in [Node/IManagerNode.ts:10](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L10)*

**Returns:** `GainNode`

___
<a id="getgroupvolume"></a>

###  getGroupVolume

▸ **getGroupVolume**(name?: *`undefined` | `string`*): `number`

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[getGroupVolume](inodecollectionsubmanager.md#getgroupvolume)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:21](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L21)*

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

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[getGroups](inodecollectionsubmanager.md#getgroups)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:16](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** [IGroup](igroup.md)

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[getGroups](inodecollectionsubmanager.md#getgroups)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:17](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** [IGroup](igroup.md)[]

___
<a id="getinputnode"></a>

###  getInputNode

▸ **getInputNode**(): `AudioNode`

*Inherited from [IManagerNode](imanagernode.md).[getInputNode](imanagernode.md#getinputnode)*

*Defined in [Node/IManagerNode.ts:11](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L11)*

**Returns:** `AudioNode`

___
<a id="getoutputnode"></a>

###  getOutputNode

▸ **getOutputNode**(): `AnalyserNode`

*Inherited from [IAnalysableNode](ianalysablenode.md).[getOutputNode](ianalysablenode.md#getoutputnode)*

*Defined in [Node/IAnalysableNode.ts:3](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IAnalysableNode.ts#L3)*

**Returns:** `AnalyserNode`

___
<a id="getplaylists"></a>

###  getPlaylists

▸ **getPlaylists**(name: *`string`*): [IPlaylist](iplaylist.md)

▸ **getPlaylists**(names: *`string`[]*): [IPlaylist](iplaylist.md)[]

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[getPlaylists](inodeplaysubmanager.md#getplaylists)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:23](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** [IPlaylist](iplaylist.md)

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[getPlaylists](inodeplaysubmanager.md#getplaylists)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:24](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** [IPlaylist](iplaylist.md)[]

___
<a id="getsoundvolume"></a>

###  getSoundVolume

▸ **getSoundVolume**(name: *`string`*, groupName?: *`undefined` | `string`*): `number`

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[getSoundVolume](inodecollectionsubmanager.md#getsoundvolume)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:34](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L34)*

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

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[getSounds](inodecollectionsubmanager.md#getsounds)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:29](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** [ISound](isound.md)

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[getSounds](inodecollectionsubmanager.md#getsounds)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:30](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |
| `Optional` groupName | `undefined` | `string` |

**Returns:** [ISound](isound.md)[]

___
<a id="getvolume"></a>

###  getVolume

▸ **getVolume**(): `number`

*Inherited from [IManagerNode](imanagernode.md).[getVolume](imanagernode.md#getvolume)*

*Defined in [Node/IManagerNode.ts:12](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L12)*

**Returns:** `number`

___
<a id="initializedefaultgroup"></a>

###  initializeDefaultGroup

▸ **initializeDefaultGroup**(): `this`

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[initializeDefaultGroup](inodecollectionsubmanager.md#initializedefaultgroup)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:15](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L15)*

**Returns:** `this`

___
<a id="iswebaudio"></a>

###  isWebAudio

▸ **isWebAudio**(): `boolean`

*Inherited from [IManagerNode](imanagernode.md).[isWebAudio](imanagernode.md#iswebaudio)*

*Defined in [Node/IManagerNode.ts:7](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L7)*

**Returns:** `boolean`

___
<a id="pauseallsounds"></a>

###  pauseAllSounds

▸ **pauseAllSounds**(groupName?: *`undefined` | `string`*): `this`

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[pauseAllSounds](inodeplaysubmanager.md#pauseallsounds)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:17](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

___
<a id="pausesounds"></a>

###  pauseSounds

▸ **pauseSounds**(name: *`string`*, groupName?: *`undefined` | `string`*): `this`

▸ **pauseSounds**(names: *`string`[]*, groupName?: *`undefined` | `string`*): `this`

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[pauseSounds](inodeplaysubmanager.md#pausesounds)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:15](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L15)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[pauseSounds](inodeplaysubmanager.md#pausesounds)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:16](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

___
<a id="playallsounds"></a>

###  playAllSounds

▸ **playAllSounds**(groupName?: *`undefined` | `string`*): `Promise`<`Event`[]>

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[playAllSounds](inodeplaysubmanager.md#playallsounds)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:14](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `Promise`<`Event`[]>

___
<a id="playgroups"></a>

###  playGroups

▸ **playGroups**(name: *`string`*): `Promise`<`Event`[]>

▸ **playGroups**(names: *`string`[]*): `Promise`<`Event`[]>

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[playGroups](inodeplaysubmanager.md#playgroups)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:10](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `Promise`<`Event`[]>

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[playGroups](inodeplaysubmanager.md#playgroups)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:11](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** `Promise`<`Event`[]>

___
<a id="playplaylist"></a>

###  playPlaylist

▸ **playPlaylist**(name: *`string`*): `Promise`<`void`>

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[playPlaylist](inodeplaysubmanager.md#playplaylist)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:25](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `Promise`<`void`>

___
<a id="playplaylists"></a>

###  playPlaylists

▸ **playPlaylists**(name: *`string`*): `Promise`<`void`>

▸ **playPlaylists**(names: *`string`[]*): `Promise`<`void`>

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[playPlaylists](inodeplaysubmanager.md#playplaylists)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:26](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `Promise`<`void`>

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[playPlaylists](inodeplaysubmanager.md#playplaylists)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:27](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L27)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** `Promise`<`void`>

___
<a id="playsounds"></a>

###  playSounds

▸ **playSounds**(name: *`string`*, groupName?: *`undefined` | `string`*): `Promise`<`Event`>

▸ **playSounds**(names: *`string`[]*, groupName?: *`undefined` | `string`*): `Promise`<`Event`[]>

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[playSounds](inodeplaysubmanager.md#playsounds)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:12](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `Promise`<`Event`>

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[playSounds](inodeplaysubmanager.md#playsounds)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:13](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `Promise`<`Event`[]>

___
<a id="removeallgroups"></a>

###  removeAllGroups

▸ **removeAllGroups**(): `this`

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[removeAllGroups](inodecollectionsubmanager.md#removeallgroups)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:20](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L20)*

**Returns:** `this`

___
<a id="removeallsounds"></a>

###  removeAllSounds

▸ **removeAllSounds**(groupName?: *`undefined` | `string`*): `this`

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[removeAllSounds](inodecollectionsubmanager.md#removeallsounds)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:33](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L33)*

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

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[removeGroups](inodecollectionsubmanager.md#removegroups)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:18](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `this`

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[removeGroups](inodecollectionsubmanager.md#removegroups)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:19](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L19)*

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

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[removeSounds](inodecollectionsubmanager.md#removesounds)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:31](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[removeSounds](inodecollectionsubmanager.md#removesounds)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:32](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L32)*

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

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[setGroupVolume](inodecollectionsubmanager.md#setgroupvolume)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:22](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L22)*

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

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[setSoundVolume](inodecollectionsubmanager.md#setsoundvolume)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:35](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L35)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| value | `number` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

___
<a id="setvolume"></a>

###  setVolume

▸ **setVolume**(value: *`number`*): [IManagerNode](imanagernode.md)

*Inherited from [IManagerNode](imanagernode.md).[setVolume](imanagernode.md#setvolume)*

*Defined in [Node/IManagerNode.ts:13](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Node/IManagerNode.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `number` |

**Returns:** [IManagerNode](imanagernode.md)

___
<a id="stopallsounds"></a>

###  stopAllSounds

▸ **stopAllSounds**(groupName?: *`undefined` | `string`*): `this`

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[stopAllSounds](inodeplaysubmanager.md#stopallsounds)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:20](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

___
<a id="stopplaylists"></a>

###  stopPlaylists

▸ **stopPlaylists**(name: *`string`*): `this`

▸ **stopPlaylists**(names: *`string`[]*): `this`

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[stopPlaylists](inodeplaysubmanager.md#stopplaylists)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:28](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `this`

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[stopPlaylists](inodeplaysubmanager.md#stopplaylists)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:29](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** `this`

___
<a id="stopsounds"></a>

###  stopSounds

▸ **stopSounds**(name: *`string`*, groupName?: *`undefined` | `string`*): `this`

▸ **stopSounds**(names: *`string`[]*, groupName?: *`undefined` | `string`*): `this`

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[stopSounds](inodeplaysubmanager.md#stopsounds)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:18](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

*Inherited from [INodePlaySubmanager](inodeplaysubmanager.md).[stopSounds](inodeplaysubmanager.md#stopsounds)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:19](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

___
<a id="updateallaudioelementsvolume"></a>

###  updateAllAudioElementsVolume

▸ **updateAllAudioElementsVolume**(): `this`

*Inherited from [INodeCollectionSubmanager](inodecollectionsubmanager.md).[updateAllAudioElementsVolume](inodecollectionsubmanager.md#updateallaudioelementsvolume)*

*Defined in [Manager/Submanagers/INodeCollectionSubmanager.ts:36](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodeCollectionSubmanager.ts#L36)*

**Returns:** `this`

___
<a id="updatevolumepanelelement"></a>

###  updateVolumePanelElement

▸ **updateVolumePanelElement**(): `this`

*Inherited from [IVolumePanelSubmanager](ivolumepanelsubmanager.md).[updateVolumePanelElement](ivolumepanelsubmanager.md#updatevolumepanelelement)*

*Defined in [Manager/Submanagers/IVolumePanelSubmanager.ts:8](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/IVolumePanelSubmanager.ts#L8)*

**Returns:** `this`

___
<a id="volumepanelderegister"></a>

###  volumePanelDeregister

▸ **volumePanelDeregister**(node: *[IPanelRegisterableNode](ipanelregisterablenode.md)*): `this`

*Inherited from [IVolumePanelSubmanager](ivolumepanelsubmanager.md).[volumePanelDeregister](ivolumepanelsubmanager.md#volumepanelderegister)*

*Defined in [Manager/Submanagers/IVolumePanelSubmanager.ts:10](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/IVolumePanelSubmanager.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [IPanelRegisterableNode](ipanelregisterablenode.md) |

**Returns:** `this`

___
<a id="volumepanelregister"></a>

###  volumePanelRegister

▸ **volumePanelRegister**(node: *[IPanelRegisterableNode](ipanelregisterablenode.md)*): `this`

*Inherited from [IVolumePanelSubmanager](ivolumepanelsubmanager.md).[volumePanelRegister](ivolumepanelsubmanager.md#volumepanelregister)*

*Defined in [Manager/Submanagers/IVolumePanelSubmanager.ts:9](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/IVolumePanelSubmanager.ts#L9)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [IPanelRegisterableNode](ipanelregisterablenode.md) |

**Returns:** `this`

___

