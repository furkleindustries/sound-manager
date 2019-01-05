[sound-manager](../README.md) > [Playlist](../classes/playlist.md)

# Class: Playlist

## Hierarchy

**Playlist**

## Implements

* [IPlaylist](../interfaces/iplaylist.md)

## Index

### Constructors

* [constructor](playlist.md#constructor)

### Properties

* [callback](playlist.md#callback)
* [fade](playlist.md#fade)
* [ids](playlist.md#ids)
* [loop](playlist.md#loop)

### Methods

* [loopIsValid](playlist.md#loopisvalid)
* [tryCallback](playlist.md#trycallback)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Playlist**(options: *[IPlaylistOptions](../interfaces/iplaylistoptions.md)*): [Playlist](playlist.md)

*Defined in [Playlist/Playlist.ts:30](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/Playlist.ts#L30)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [IPlaylistOptions](../interfaces/iplaylistoptions.md) |

**Returns:** [Playlist](playlist.md)

___

## Properties

<a id="callback"></a>

### `<Optional>` callback

**● callback**: *`undefined` | `function`*

*Implementation of [IPlaylist](../interfaces/iplaylist.md).[callback](../interfaces/iplaylist.md#callback)*

*Defined in [Playlist/Playlist.ts:30](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/Playlist.ts#L30)*

___
<a id="fade"></a>

###  fade

**● fade**: *[IFade](../interfaces/ifade.md) | `null`* =  null

*Implementation of [IPlaylist](../interfaces/iplaylist.md).[fade](../interfaces/iplaylist.md#fade)*

*Defined in [Playlist/Playlist.ts:29](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/Playlist.ts#L29)*

___
<a id="ids"></a>

###  ids

**● ids**: *`ReadonlyArray`<[ISoundGroupIdentifier](../interfaces/isoundgroupidentifier.md)>*

*Implementation of [IPlaylist](../interfaces/iplaylist.md).[ids](../interfaces/iplaylist.md#ids)*

*Defined in [Playlist/Playlist.ts:28](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/Playlist.ts#L28)*

___
<a id="loop"></a>

###  loop

**● loop**: *`boolean` | `number`* = false

*Implementation of [IPlaylist](../interfaces/iplaylist.md).[loop](../interfaces/iplaylist.md#loop)*

*Defined in [Playlist/Playlist.ts:27](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/Playlist.ts#L27)*

___

## Methods

<a id="loopisvalid"></a>

###  loopIsValid

▸ **loopIsValid**(): `boolean`

*Implementation of [IPlaylist](../interfaces/iplaylist.md).[loopIsValid](../interfaces/iplaylist.md#loopisvalid)*

*Defined in [Playlist/Playlist.ts:60](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/Playlist.ts#L60)*

**Returns:** `boolean`

___
<a id="trycallback"></a>

###  tryCallback

▸ **tryCallback**(events: *`Event`[]*, name?: *`undefined` | `string`*): `void`

*Implementation of [IPlaylist](../interfaces/iplaylist.md).[tryCallback](../interfaces/iplaylist.md#trycallback)*

*Defined in [Playlist/Playlist.ts:64](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/Playlist.ts#L64)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| events | `Event`[] |
| `Optional` name | `undefined` | `string` |

**Returns:** `void`

___

