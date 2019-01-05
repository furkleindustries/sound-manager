[sound-manager](../README.md) > [INodePlaySubmanager](../interfaces/inodeplaysubmanager.md)

# Interface: INodePlaySubmanager

## Hierarchy

**INodePlaySubmanager**

↳  [IManager](imanager.md)

## Index

### Properties

* [__playlists](inodeplaysubmanager.md#__playlists)
* [playlists](inodeplaysubmanager.md#playlists)

### Methods

* [addPlaylist](inodeplaysubmanager.md#addplaylist)
* [addPlaylists](inodeplaysubmanager.md#addplaylists)
* [getPlaylists](inodeplaysubmanager.md#getplaylists)
* [pauseAllSounds](inodeplaysubmanager.md#pauseallsounds)
* [pauseSounds](inodeplaysubmanager.md#pausesounds)
* [playAllSounds](inodeplaysubmanager.md#playallsounds)
* [playGroups](inodeplaysubmanager.md#playgroups)
* [playPlaylist](inodeplaysubmanager.md#playplaylist)
* [playPlaylists](inodeplaysubmanager.md#playplaylists)
* [playSounds](inodeplaysubmanager.md#playsounds)
* [stopAllSounds](inodeplaysubmanager.md#stopallsounds)
* [stopPlaylists](inodeplaysubmanager.md#stopplaylists)
* [stopSounds](inodeplaysubmanager.md#stopsounds)

---

## Properties

<a id="__playlists"></a>

###  __playlists

**● __playlists**: *[IPlaylistsMap](iplaylistsmap.md)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:8](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L8)*

___
<a id="playlists"></a>

###  playlists

**● playlists**: *[IPlaylistsMap](iplaylistsmap.md)*

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:9](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L9)*

___

## Methods

<a id="addplaylist"></a>

###  addPlaylist

▸ **addPlaylist**(name: *`string`*, options: *[IPlaylistOptions](iplaylistoptions.md)*): [IPlaylist](iplaylist.md)

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

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:22](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| playlists | [IPlaylistsMap](iplaylistsmap.md) |

**Returns:** `this`

___
<a id="getplaylists"></a>

###  getPlaylists

▸ **getPlaylists**(name: *`string`*): [IPlaylist](iplaylist.md)

▸ **getPlaylists**(names: *`string`[]*): [IPlaylist](iplaylist.md)[]

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:23](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** [IPlaylist](iplaylist.md)

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:24](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |

**Returns:** [IPlaylist](iplaylist.md)[]

___
<a id="pauseallsounds"></a>

###  pauseAllSounds

▸ **pauseAllSounds**(groupName?: *`undefined` | `string`*): `this`

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

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:15](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L15)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

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

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:10](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `Promise`<`Event`[]>

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

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:26](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L26)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `Promise`<`void`>

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

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:12](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `Promise`<`Event`>

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:13](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `Promise`<`Event`[]>

___
<a id="stopallsounds"></a>

###  stopAllSounds

▸ **stopAllSounds**(groupName?: *`undefined` | `string`*): `this`

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

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:28](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `this`

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

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:18](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

*Defined in [Manager/Submanagers/INodePlaySubmanager.ts:19](https://github.com/furkleindustries/sound-manager/blob/5232f22/src/Manager/Submanagers/INodePlaySubmanager.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |
| `Optional` groupName | `undefined` | `string` |

**Returns:** `this`

___

