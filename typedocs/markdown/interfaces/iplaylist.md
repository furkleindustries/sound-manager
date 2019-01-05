[sound-manager](../README.md) > [IPlaylist](../interfaces/iplaylist.md)

# Interface: IPlaylist

## Hierarchy

**IPlaylist**

## Implemented by

* [Playlist](../classes/playlist.md)

## Index

### Properties

* [fade](iplaylist.md#fade)
* [ids](iplaylist.md#ids)
* [loop](iplaylist.md#loop)

### Methods

* [callback](iplaylist.md#callback)
* [loopIsValid](iplaylist.md#loopisvalid)
* [tryCallback](iplaylist.md#trycallback)

---

## Properties

<a id="fade"></a>

###  fade

**● fade**: *[IFade](ifade.md) | `null`*

*Defined in [Playlist/IPlaylist.ts:9](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/IPlaylist.ts#L9)*

___
<a id="ids"></a>

###  ids

**● ids**: *`ReadonlyArray`<[ISoundGroupIdentifier](isoundgroupidentifier.md)>*

*Defined in [Playlist/IPlaylist.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/IPlaylist.ts#L11)*

___
<a id="loop"></a>

###  loop

**● loop**: *`boolean` | `number`*

*Defined in [Playlist/IPlaylist.ts:10](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/IPlaylist.ts#L10)*

___

## Methods

<a id="callback"></a>

### `<Optional>` callback

▸ **callback**(events: *`Event`[]*): `void`

*Defined in [Playlist/IPlaylist.ts:14](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/IPlaylist.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| events | `Event`[] |

**Returns:** `void`

___
<a id="loopisvalid"></a>

###  loopIsValid

▸ **loopIsValid**(): `boolean`

*Defined in [Playlist/IPlaylist.ts:12](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/IPlaylist.ts#L12)*

**Returns:** `boolean`

___
<a id="trycallback"></a>

###  tryCallback

▸ **tryCallback**(events: *`Event`[]*, name?: *`undefined` | `string`*): `void`

*Defined in [Playlist/IPlaylist.ts:13](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/IPlaylist.ts#L13)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| events | `Event`[] |
| `Optional` name | `undefined` | `string` |

**Returns:** `void`

___

