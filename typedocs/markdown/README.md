
Sound Manager
=============

[![Build Status](https://travis-ci.com/furkleindustries/sound-manager.svg?branch=master)](https://travis-ci.com/furkleindustries/sound-manager) [![Test Coverage](https://api.codeclimate.com/v1/badges/593d48d6cb6e981eb227/test_coverage)](https://codeclimate.com/github/furkleindustries/sound-manager/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/593d48d6cb6e981eb227/maintainability)](https://codeclimate.com/github/furkleindustries/sound-manager/maintainability) [![Total alerts](https://img.shields.io/lgtm/alerts/g/furkleindustries/sound-manager.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/furkleindustries/sound-manager/alerts/)

Introduction
------------

A full-service sound manager designed for use with hypertext fiction systems like Twine or Accelerate.

Type documentation
------------------

There is a full set of type-oriented API documentation [here](/typedocs).

## Index

### Enumerations

* [EasingCurves](enums/easingcurves.md)
* [NodeTypes](enums/nodetypes.md)
* [SubmanagerTypes](enums/submanagertypes.md)

### Classes

* [Fade](classes/fade.md)
* [Group](classes/group.md)
* [Manager](classes/manager.md)
* [ManagerNode](classes/managernode.md)
* [Playlist](classes/playlist.md)
* [Sound](classes/sound.md)

### Interfaces

* [IAnalysableNode](interfaces/ianalysablenode.md)
* [ICollection](interfaces/icollection.md)
* [IConstructor](interfaces/iconstructor.md)
* [ICreateHtmlAudioSoundOptions](interfaces/icreatehtmlaudiosoundoptions.md)
* [ICreateSoundOptions](interfaces/icreatesoundoptions.md)
* [IFade](interfaces/ifade.md)
* [IFadeOptions](interfaces/ifadeoptions.md)
* [IFadeProperty](interfaces/ifadeproperty.md)
* [IGroup](interfaces/igroup.md)
* [IGroupOptions](interfaces/igroupoptions.md)
* [IGroupsMap](interfaces/igroupsmap.md)
* [IManager](interfaces/imanager.md)
* [IManagerNode](interfaces/imanagernode.md)
* [IManagerNodeOptions](interfaces/imanagernodeoptions.md)
* [IManagerOptions](interfaces/imanageroptions.md)
* [INodeCollectionSubmanager](interfaces/inodecollectionsubmanager.md)
* [INodePlaySubmanager](interfaces/inodeplaysubmanager.md)
* [IPanelRegisterableNode](interfaces/ipanelregisterablenode.md)
* [IPlaylist](interfaces/iplaylist.md)
* [IPlaylistOptions](interfaces/iplaylistoptions.md)
* [IPlaylistsMap](interfaces/iplaylistsmap.md)
* [ISound](interfaces/isound.md)
* [ISoundGroupIdentifier](interfaces/isoundgroupidentifier.md)
* [ISoundOptions](interfaces/isoundoptions.md)
* [ISoundsMap](interfaces/isoundsmap.md)
* [IVolumePanelSubmanager](interfaces/ivolumepanelsubmanager.md)

### Type aliases

* [TFadeArg](#tfadearg)
* [TSoundGroupIdentifierArg](#tsoundgroupidentifierarg)

### Variables

* [ctxCtor](#ctxctor)
* [inDevMode](#indevmode)
* [memoizedValue](#memoizedvalue)
* [webkitAudioContext](#webkitaudiocontext)

### Functions

* [AnalysableNodeMixin](#analysablenodemixin)
* [NodeCollectionSubmanagerMixin](#nodecollectionsubmanagermixin)
* [NodePlaySubmanagerMixin](#nodeplaysubmanagermixin)
* [PanelRegisterableNodeMixin](#panelregisterablenodemixin)
* [VolumePanelSubmanagerMixin](#volumepanelsubmanagermixin)
* [argToPropHelper](#argtoprophelper)
* [assert](#assert)
* [assertNodeIsHtmlAudio](#assertnodeishtmlaudio)
* [assertNodeIsWebAudio](#assertnodeiswebaudio)
* [assertValid](#assertvalid)
* [clearScheduledFadesOnSound](#clearscheduledfadesonsound)
* [createFade](#createfade)
* [createGroup](#creategroup)
* [createHtmlAudioSound](#createhtmlaudiosound)
* [createHtmlHelper](#createhtmlhelper)
* [createPlaylist](#createplaylist)
* [createSound](#createsound)
* [createWebAudioSound](#createwebaudiosound)
* [createWebHelper](#createwebhelper)
* [deepFlattenArray](#deepflattenarray)
* [defineProperty](#defineproperty)
* [doToOne](#dotoone)
* [doToOneOrMany](#dotooneormany)
* [fadeArgumentToFadeProperty](#fadeargumenttofadeproperty)
* [generateVolumeComponent](#generatevolumecomponent)
* [generateVolumeInputComponent](#generatevolumeinputcomponent)
* [generateVolumeLabelComponent](#generatevolumelabelcomponent)
* [generateVolumePanelElement](#generatevolumepanelelement)
* [getEasingFunction](#geteasingfunction)
* [getFadeValueAtTime](#getfadevalueattime)
* [getFadeVolume](#getfadevolume)
* [getFrozenObject](#getfrozenobject)
* [getNewSourceNode](#getnewsourcenode)
* [getOne](#getone)
* [getOneOrMany](#getoneormany)
* [getPlaylistMessage](#getplaylistmessage)
* [initializeEventsForPlay](#initializeeventsforplay)
* [initializeFadeForPlay](#initializefadeforplay)
* [initializePromiseForPlay](#initializepromiseforplay)
* [initializeSoundForPlay](#initializesoundforplay)
* [initializeSoundForWebAudio](#initializesoundforwebaudio)
* [initializeStopRejector](#initializestoprejector)
* [isDev](#isdev)
* [isValidVolume](#isvalidvolume)
* [loadAudioBuffer](#loadaudiobuffer)
* [loopIsInBoundInteger](#loopisinboundinteger)
* [loopIsValid](#loopisvalid)
* [makeSoundGroupIdentifier](#makesoundgroupidentifier)
* [nameOrAllKeys](#nameorallkeys)
* [normalizeFadeProp](#normalizefadeprop)
* [playAudioSource](#playaudiosource)
* [scheduleHtmlAudioFades](#schedulehtmlaudiofades)
* [scheduleWebAudioFadeIn](#schedulewebaudiofadein)
* [scheduleWebAudioFadeOut](#schedulewebaudiofadeout)
* [scheduleWebAudioFades](#schedulewebaudiofades)
* [setPerPlaySoundOverrides](#setperplaysoundoverrides)
* [shallowFlattenArray](#shallowflattenarray)
* [shouldLoopPlaylist](#shouldloopplaylist)
* [structureFadePropFromArray](#structurefadepropfromarray)
* [structureFadePropFromObject](#structurefadepropfromobject)
* [structureFadePropFromValue](#structurefadepropfromvalue)
* [structureSoundGroupIdentifier](#structuresoundgroupidentifier)
* [trySetSoundFade](#trysetsoundfade)
* [trySetSoundLoop](#trysetsoundloop)
* [trySetSoundTrackPosition](#trysetsoundtrackposition)
* [trySetSoundVolume](#trysetsoundvolume)
* [updateAudioPanelElement](#updateaudiopanelelement)
* [updateSoundTimes](#updatesoundtimes)
* [validatorWrapper](#validatorwrapper)
* [warn](#warn)

### Object literals

* [funcs](#funcs)
* [strings](#strings)

---

## Type aliases

<a id="tfadearg"></a>

###  TFadeArg

**Ƭ TFadeArg**: *`T` | [`T`, `T`] | [IFadeProperty](interfaces/ifadeproperty.md)<`T`>*

*Defined in [Fade/TFadeArg.ts:5](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/TFadeArg.ts#L5)*

___
<a id="tsoundgroupidentifierarg"></a>

###  TSoundGroupIdentifierArg

**Ƭ TSoundGroupIdentifierArg**: *`string` | [`string`, `string`] | [ISoundGroupIdentifier](interfaces/isoundgroupidentifier.md)*

*Defined in [typeAliases/TSoundGroupIdentifierArg.ts:5](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/typeAliases/TSoundGroupIdentifierArg.ts#L5)*

___

## Variables

<a id="ctxctor"></a>

### `<Const>` ctxCtor

**● ctxCtor**: *`object`* =  AudioContext || webkitAudioContext

*Defined in [Manager/Manager.ts:36](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Manager.ts#L36)*

#### Type declaration

 constructor : function
⊕ **new __type**(contextOptions?: *`AudioContextOptions`*): `AudioContext`

*Defined in C:/Users/furkle/Documents/code/sound-manager/node_modules/typedoc/node_modules/typescript/lib/lib.dom.d.ts:1900*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` contextOptions | `AudioContextOptions` |

**Returns:** `AudioContext`

 prototype: `AudioContext`

___
<a id="indevmode"></a>

### `<Const>` inDevMode

**● inDevMode**: *`boolean`* =  isDev()

*Defined in [logging/warn.ts:5](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/logging/warn.ts#L5)*

___
<a id="memoizedvalue"></a>

### `<Let>` memoizedValue

**● memoizedValue**: *`boolean`*

*Defined in [functions/isDev.ts:1](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/isDev.ts#L1)*

___
<a id="webkitaudiocontext"></a>

### `<Const>` webkitAudioContext

**● webkitAudioContext**: *`AudioContext`*

*Defined in [Manager/Manager.ts:35](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Manager.ts#L35)*

___

## Functions

<a id="analysablenodemixin"></a>

###  AnalysableNodeMixin

▸ **AnalysableNodeMixin**<`T`>(Base: *`T`*): `AnalysableNodeMixin` & `T`

*Defined in [Node/AnalysableNodeMixin.ts:17](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/AnalysableNodeMixin.ts#L17)*

**Type parameters:**

#### T :  [IConstructor](interfaces/iconstructor.md)<[IManagerNode](interfaces/imanagernode.md)>
**Parameters:**

| Name | Type |
| ------ | ------ |
| Base | `T` |

**Returns:** `AnalysableNodeMixin` & `T`

___
<a id="nodecollectionsubmanagermixin"></a>

###  NodeCollectionSubmanagerMixin

▸ **NodeCollectionSubmanagerMixin**<`T`>(Base: *`T`*): `NodeCollectionSubmanagerMixin` & `T`

*Defined in [Manager/Submanagers/NodeCollectionSubmanagerMixin.ts:53](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/NodeCollectionSubmanagerMixin.ts#L53)*

**Type parameters:**

#### T :  [IConstructor](interfaces/iconstructor.md)<[IManagerNode](interfaces/imanagernode.md)>
**Parameters:**

| Name | Type |
| ------ | ------ |
| Base | `T` |

**Returns:** `NodeCollectionSubmanagerMixin` & `T`

___
<a id="nodeplaysubmanagermixin"></a>

###  NodePlaySubmanagerMixin

▸ **NodePlaySubmanagerMixin**<`T`>(Base: *`T`*): `NodePlaySubmanagerMixin` & `T`

*Defined in [Manager/Submanagers/NodePlaySubmanagerMixin.ts:19](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/NodePlaySubmanagerMixin.ts#L19)*

**Type parameters:**

#### T :  [IConstructor](interfaces/iconstructor.md)<[IManagerNode](interfaces/imanagernode.md) & [INodeCollectionSubmanager](interfaces/inodecollectionsubmanager.md)>
**Parameters:**

| Name | Type |
| ------ | ------ |
| Base | `T` |

**Returns:** `NodePlaySubmanagerMixin` & `T`

___
<a id="panelregisterablenodemixin"></a>

###  PanelRegisterableNodeMixin

▸ **PanelRegisterableNodeMixin**<`T`>(Base: *`T`*): `PanelRegisterableNode` & `T`

*Defined in [Node/PanelRegisterableNodeMixin.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Node/PanelRegisterableNodeMixin.ts#L11)*

**Type parameters:**

#### T :  [IConstructor](interfaces/iconstructor.md)<[IManagerNode](interfaces/imanagernode.md)>
**Parameters:**

| Name | Type |
| ------ | ------ |
| Base | `T` |

**Returns:** `PanelRegisterableNode` & `T`

___
<a id="volumepanelsubmanagermixin"></a>

###  VolumePanelSubmanagerMixin

▸ **VolumePanelSubmanagerMixin**<`T`>(Base: *`T`*): `VolumePanelSubmanagerMixin` & `T`

*Defined in [Manager/Submanagers/VolumePanelSubmanagerMixin.ts:10](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/Submanagers/VolumePanelSubmanagerMixin.ts#L10)*

**Type parameters:**

#### T :  [IConstructor](interfaces/iconstructor.md)<[IManagerNode](interfaces/imanagernode.md) & [INodeCollectionSubmanager](interfaces/inodecollectionsubmanager.md)>
**Parameters:**

| Name | Type |
| ------ | ------ |
| Base | `T` |

**Returns:** `VolumePanelSubmanagerMixin` & `T`

___
<a id="argtoprophelper"></a>

###  argToPropHelper

▸ **argToPropHelper**<`T`>(arg: *[TFadeArg](#tfadearg)<`T`>*, validator: *`function`*): `object`

*Defined in [Fade/fadeUtils.ts:22](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/fadeUtils.ts#L22)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | [TFadeArg](#tfadearg)<`T`> |
| validator | `function` |

**Returns:** `object`

___
<a id="assert"></a>

###  assert

▸ **assert**(condition: *`any`*, message?: *`undefined` | `string`*): `boolean`

*Defined in [assertions/assert.ts:1](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/assertions/assert.ts#L1)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| condition | `any` |
| `Optional` message | `undefined` | `string` |

**Returns:** `boolean`

___
<a id="assertnodeishtmlaudio"></a>

###  assertNodeIsHtmlAudio

▸ **assertNodeIsHtmlAudio**<`T`>(node: *`T`*, methodName?: *`keyof T`*): `void`

*Defined in [assertions/assertNodeIsHtmlAudio.ts:8](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/assertions/assertNodeIsHtmlAudio.ts#L8)*

**Type parameters:**

#### T :  [IManagerNode](interfaces/imanagernode.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| node | `T` |
| `Optional` methodName | `keyof T` |

**Returns:** `void`

___
<a id="assertnodeiswebaudio"></a>

###  assertNodeIsWebAudio

▸ **assertNodeIsWebAudio**<`T`>(node: *`T`*, methodName?: *`keyof T`*): `void`

*Defined in [assertions/assertNodeIsWebAudio.ts:8](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/assertions/assertNodeIsWebAudio.ts#L8)*

**Type parameters:**

#### T :  [IManagerNode](interfaces/imanagernode.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| node | `T` |
| `Optional` methodName | `keyof T` |

**Returns:** `void`

___
<a id="assertvalid"></a>

###  assertValid

▸ **assertValid**<`T`>(value: *`any`*, message?: *`undefined` | `string`*, validator?: *`undefined` | `function`*): `T`

*Defined in [assertions/assertValid.ts:5](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/assertions/assertValid.ts#L5)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |
| `Optional` message | `undefined` | `string` |
| `Optional` validator | `undefined` | `function` |

**Returns:** `T`

___
<a id="clearscheduledfadesonsound"></a>

###  clearScheduledFadesOnSound

▸ **clearScheduledFadesOnSound**(sound: *[ISound](interfaces/isound.md)*): `void`

*Defined in [Sound/clearScheduledFadesOnSound.ts:5](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/clearScheduledFadesOnSound.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |

**Returns:** `void`

___
<a id="createfade"></a>

###  createFade

▸ **createFade**(options?: *[IFadeOptions](interfaces/ifadeoptions.md)*): [Fade](classes/fade.md)

*Defined in [Fade/createFade.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/createFade.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [IFadeOptions](interfaces/ifadeoptions.md) |

**Returns:** [Fade](classes/fade.md)

___
<a id="creategroup"></a>

###  createGroup

▸ **createGroup**(options?: *[IGroupOptions](interfaces/igroupoptions.md)*): [Group](classes/group.md)

*Defined in [Group/createGroup.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Group/createGroup.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [IGroupOptions](interfaces/igroupoptions.md) |

**Returns:** [Group](classes/group.md)

___
<a id="createhtmlaudiosound"></a>

### `<Const>` createHtmlAudioSound

▸ **createHtmlAudioSound**(options: *[ICreateSoundOptions](interfaces/icreatesoundoptions.md)*): `Promise`<[Sound](classes/sound.md)>

*Defined in [Sound/createHtmlAudioSound.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/createHtmlAudioSound.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [ICreateSoundOptions](interfaces/icreatesoundoptions.md) |

**Returns:** `Promise`<[Sound](classes/sound.md)>

___
<a id="createhtmlhelper"></a>

###  createHtmlHelper

▸ **createHtmlHelper**(options: *[ICreateSoundOptions](interfaces/icreatesoundoptions.md)*): `Promise`<[ISound](interfaces/isound.md)>

*Defined in [Sound/createSound.ts:59](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/createSound.ts#L59)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [ICreateSoundOptions](interfaces/icreatesoundoptions.md) |

**Returns:** `Promise`<[ISound](interfaces/isound.md)>

___
<a id="createplaylist"></a>

###  createPlaylist

▸ **createPlaylist**(options: *[IPlaylistOptions](interfaces/iplaylistoptions.md)*): [Playlist](classes/playlist.md)

*Defined in [Playlist/createPlaylist.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/createPlaylist.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [IPlaylistOptions](interfaces/iplaylistoptions.md) |

**Returns:** [Playlist](classes/playlist.md)

___
<a id="createsound"></a>

### `<Const>` createSound

▸ **createSound**(options: *[ICreateSoundOptions](interfaces/icreatesoundoptions.md)*): `Promise`<[ISound](interfaces/isound.md)>

*Defined in [Sound/createSound.ts:28](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/createSound.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [ICreateSoundOptions](interfaces/icreatesoundoptions.md) |

**Returns:** `Promise`<[ISound](interfaces/isound.md)>

___
<a id="createwebaudiosound"></a>

### `<Const>` createWebAudioSound

▸ **createWebAudioSound**(options: *[ICreateSoundOptions](interfaces/icreatesoundoptions.md)*): `Promise`<[Sound](classes/sound.md)>

*Defined in [Sound/createWebAudioSound.ts:20](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/createWebAudioSound.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [ICreateSoundOptions](interfaces/icreatesoundoptions.md) |

**Returns:** `Promise`<[Sound](classes/sound.md)>

___
<a id="createwebhelper"></a>

###  createWebHelper

▸ **createWebHelper**(options: *[ICreateSoundOptions](interfaces/icreatesoundoptions.md)*): `Promise`<[ISound](interfaces/isound.md)>

*Defined in [Sound/createSound.ts:44](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/createSound.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [ICreateSoundOptions](interfaces/icreatesoundoptions.md) |

**Returns:** `Promise`<[ISound](interfaces/isound.md)>

___
<a id="deepflattenarray"></a>

###  deepFlattenArray

▸ **deepFlattenArray**(array: *`any`[]*): `any`[]

*Defined in [functions/deepFlattenArray.ts:1](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/deepFlattenArray.ts#L1)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| array | `any`[] |

**Returns:** `any`[]

___
<a id="defineproperty"></a>

###  defineProperty

▸ **defineProperty**<`T`>(object: *`T`*, propName: *`string` | `number` | `symbol`*, value: *`any`*, options?: *`undefined` | `object`*): `void`

*Defined in [functions/defineProperty.ts:1](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/defineProperty.ts#L1)*

**Type parameters:**

#### T :  `any`
**Parameters:**

| Name | Type |
| ------ | ------ |
| object | `T` |
| propName | `string` | `number` | `symbol` |
| value | `any` |
| `Optional` options | `undefined` | `object` |

**Returns:** `void`

___
<a id="dotoone"></a>

###  doToOne

▸ **doToOne**<`T`>(collection: *[ICollection](interfaces/icollection.md)<`T`>*, propName: *`string`*, functionName: *`keyof T`*, ...args: *`any`[]*): `void`

*Defined in [functions/doToOneOrMany.ts:24](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/doToOneOrMany.ts#L24)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | [ICollection](interfaces/icollection.md)<`T`> |
| propName | `string` |
| functionName | `keyof T` |
| `Rest` args | `any`[] |

**Returns:** `void`

___
<a id="dotooneormany"></a>

###  doToOneOrMany

▸ **doToOneOrMany**<`T`>(collection: *[ICollection](interfaces/icollection.md)<`T`>*, propOrProps: *`string` | `string`[]*, functionName: *`keyof T`*, ...args: *`any`[]*): `void`

*Defined in [functions/doToOneOrMany.ts:8](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/doToOneOrMany.ts#L8)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | [ICollection](interfaces/icollection.md)<`T`> |
| propOrProps | `string` | `string`[] |
| functionName | `keyof T` |
| `Rest` args | `any`[] |

**Returns:** `void`

___
<a id="fadeargumenttofadeproperty"></a>

###  fadeArgumentToFadeProperty

▸ **fadeArgumentToFadeProperty**<`T`>(arg: *[TFadeArg](#tfadearg)<`T`>*, defaultValue: *`T` | `null`*, validator: *`function`*): [IFadeProperty](interfaces/ifadeproperty.md)<`T`>

*Defined in [Fade/fadeUtils.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/fadeUtils.ts#L11)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | [TFadeArg](#tfadearg)<`T`> |
| defaultValue | `T` | `null` |
| validator | `function` |

**Returns:** [IFadeProperty](interfaces/ifadeproperty.md)<`T`>

___
<a id="generatevolumecomponent"></a>

###  generateVolumeComponent

▸ **generateVolumeComponent**(node: *[IManagerNode](interfaces/imanagernode.md)*, name?: *`undefined` | `string`*): `HTMLDivElement`

*Defined in [functions/generateVolumeComponent.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/generateVolumeComponent.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [IManagerNode](interfaces/imanagernode.md) |
| `Optional` name | `undefined` | `string` |

**Returns:** `HTMLDivElement`

___
<a id="generatevolumeinputcomponent"></a>

###  generateVolumeInputComponent

▸ **generateVolumeInputComponent**(node: *[IManagerNode](interfaces/imanagernode.md)*, uniqueName: *`string`*): `HTMLInputElement`

*Defined in [functions/generateVolumeComponent.ts:55](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/generateVolumeComponent.ts#L55)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [IManagerNode](interfaces/imanagernode.md) |
| uniqueName | `string` |

**Returns:** `HTMLInputElement`

___
<a id="generatevolumelabelcomponent"></a>

###  generateVolumeLabelComponent

▸ **generateVolumeLabelComponent**(node: *[IManagerNode](interfaces/imanagernode.md)*, uniqueId: *`string`*, name?: *`undefined` | `string`*): `HTMLLabelElement`

*Defined in [functions/generateVolumeComponent.ts:36](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/generateVolumeComponent.ts#L36)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [IManagerNode](interfaces/imanagernode.md) |
| uniqueId | `string` |
| `Optional` name | `undefined` | `string` |

**Returns:** `HTMLLabelElement`

___
<a id="generatevolumepanelelement"></a>

###  generateVolumePanelElement

▸ **generateVolumePanelElement**(manager: *[IManagerNode](interfaces/imanagernode.md) & [INodeCollectionSubmanager](interfaces/inodecollectionsubmanager.md)*): `HTMLDivElement`

*Defined in [functions/generateVolumePanelElement.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/generateVolumePanelElement.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| manager | [IManagerNode](interfaces/imanagernode.md) & [INodeCollectionSubmanager](interfaces/inodecollectionsubmanager.md) |

**Returns:** `HTMLDivElement`

___
<a id="geteasingfunction"></a>

### `<Const>` getEasingFunction

▸ **getEasingFunction**(type: *[EasingCurves](enums/easingcurves.md)*): [__computed]() | [__computed]() | [__computed]() | [__computed]() | [__computed]() | [__computed]() | [__computed]()

*Defined in [functions/getEasingFunction.ts:7](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getEasingFunction.ts#L7)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | [EasingCurves](enums/easingcurves.md) |

**Returns:** [__computed]() | [__computed]() | [__computed]() | [__computed]() | [__computed]() | [__computed]() | [__computed]()

___
<a id="getfadevalueattime"></a>

### `<Const>` getFadeValueAtTime

▸ **getFadeValueAtTime**(__namedParameters: *`object`*): `number`

*Defined in [functions/getFadeValueAtTime.ts:8](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getFadeValueAtTime.ts#L8)*

**Parameters:**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| change | `number` |
| curve | [EasingCurves](enums/easingcurves.md) |
| duration | `number` |
| initial | `number` |
| time | `number` |

**Returns:** `number`

___
<a id="getfadevolume"></a>

###  getFadeVolume

▸ **getFadeVolume**(fade: *[IFade](interfaces/ifade.md)*, trackPosition: *`number`*, duration: *`number`*): `number`

*Defined in [Fade/getFadeVolume.ts:8](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/getFadeVolume.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fade | [IFade](interfaces/ifade.md) |
| trackPosition | `number` |
| duration | `number` |

**Returns:** `number`

___
<a id="getfrozenobject"></a>

###  getFrozenObject

▸ **getFrozenObject**<`T`>(...sources: *`T`[]*): `Readonly`<`T`>

*Defined in [functions/getFrozenObject.ts:1](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getFrozenObject.ts#L1)*

**Type parameters:**

#### T :  `any`
**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` sources | `T`[] |

**Returns:** `Readonly`<`T`>

___
<a id="getnewsourcenode"></a>

###  getNewSourceNode

▸ **getNewSourceNode**(context: *`AudioContext`*, buffer: *`AudioBuffer`*): `AudioBufferSourceNode`

*Defined in [Sound/getNewSourceNode.ts:5](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/getNewSourceNode.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| context | `AudioContext` |
| buffer | `AudioBuffer` |

**Returns:** `AudioBufferSourceNode`

___
<a id="getone"></a>

###  getOne

▸ **getOne**<`T`>(name: *`string`*, items: *[ICollection](interfaces/icollection.md)<`T`>*): `T`

*Defined in [functions/getOne.ts:5](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getOne.ts#L5)*

**Type parameters:**

#### T :  `__type`
**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| items | [ICollection](interfaces/icollection.md)<`T`> |

**Returns:** `T`

___
<a id="getoneormany"></a>

###  getOneOrMany

▸ **getOneOrMany**<`T`>(name: *`string`*, nodes: *[ICollection](interfaces/icollection.md)<`T`>*): `T`

▸ **getOneOrMany**<`T`>(names: *`string`[]*, nodes: *[ICollection](interfaces/icollection.md)<`T`>*): `T`[]

*Defined in [functions/getOneOrMany.ts:8](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getOneOrMany.ts#L8)*

**Type parameters:**

#### T :  `__type`
**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |
| nodes | [ICollection](interfaces/icollection.md)<`T`> |

**Returns:** `T`

*Defined in [functions/getOneOrMany.ts:12](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getOneOrMany.ts#L12)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| names | `string`[] |
| nodes | [ICollection](interfaces/icollection.md)<`T`> |

**Returns:** `T`[]

___
<a id="getplaylistmessage"></a>

###  getPlaylistMessage

▸ **getPlaylistMessage**(ended: *`boolean`*, looped: *`boolean`*): `object`

*Defined in [Manager/getPlaylistMessage.ts:1](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/getPlaylistMessage.ts#L1)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| ended | `boolean` |
| looped | `boolean` |

**Returns:** `object`

___
<a id="initializeeventsforplay"></a>

###  initializeEventsForPlay

▸ **initializeEventsForPlay**(sound: *[ISound](interfaces/isound.md)*, resolver: *`function`*, audioElement?: *`HTMLAudioElement`*, timeUpdate?: *`undefined` | `function`*): `void`

*Defined in [Sound/initializeSoundForPlay.ts:77](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/initializeSoundForPlay.ts#L77)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |
| resolver | `function` |
| `Optional` audioElement | `HTMLAudioElement` |
| `Optional` timeUpdate | `undefined` | `function` |

**Returns:** `void`

___
<a id="initializefadeforplay"></a>

###  initializeFadeForPlay

▸ **initializeFadeForPlay**(__namedParameters: *`object`*): `void`

*Defined in [Sound/initializeSoundForPlay.ts:36](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/initializeSoundForPlay.ts#L36)*

**Parameters:**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| audioElement | `undefined` | `HTMLAudioElement` |
| htmlTimeUpdater | `function` |
| sound | [ISound](interfaces/isound.md) |

**Returns:** `void`

___
<a id="initializepromiseforplay"></a>

###  initializePromiseForPlay

▸ **initializePromiseForPlay**(sound: *[ISound](interfaces/isound.md)*, audioElement?: *`HTMLAudioElement`*, timeUpdate?: *`undefined` | `function`*): `void`

*Defined in [Sound/initializeSoundForPlay.ts:63](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/initializeSoundForPlay.ts#L63)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |
| `Optional` audioElement | `HTMLAudioElement` |
| `Optional` timeUpdate | `undefined` | `function` |

**Returns:** `void`

___
<a id="initializesoundforplay"></a>

###  initializeSoundForPlay

▸ **initializeSoundForPlay**(sound: *[ISound](interfaces/isound.md)*, audioElement?: *`HTMLAudioElement`*): `void`

*Defined in [Sound/initializeSoundForPlay.ts:17](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/initializeSoundForPlay.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |
| `Optional` audioElement | `HTMLAudioElement` |

**Returns:** `void`

___
<a id="initializesoundforwebaudio"></a>

###  initializeSoundForWebAudio

▸ **initializeSoundForWebAudio**(sound: *[ISound](interfaces/isound.md)*, buffer: *`AudioBuffer`*): `void`

*Defined in [Sound/initializeSoundForWebAudio.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/initializeSoundForWebAudio.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |
| buffer | `AudioBuffer` |

**Returns:** `void`

___
<a id="initializestoprejector"></a>

###  initializeStopRejector

▸ **initializeStopRejector**(sound: *[ISound](interfaces/isound.md)*, reject: *`Function`*): `void`

*Defined in [Sound/initializeSoundForPlay.ts:54](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/initializeSoundForPlay.ts#L54)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |
| reject | `Function` |

**Returns:** `void`

___
<a id="isdev"></a>

###  isDev

▸ **isDev**(): `boolean`

*Defined in [functions/isDev.ts:2](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/isDev.ts#L2)*

**Returns:** `boolean`

___
<a id="isvalidvolume"></a>

###  isValidVolume

▸ **isValidVolume**(value: *`any`*): `boolean`

*Defined in [functions/isValidVolume.ts:1](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/isValidVolume.ts#L1)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="loadaudiobuffer"></a>

### `<Const>` loadAudioBuffer

▸ **loadAudioBuffer**(url: *`string`*, context: *`AudioContext`*): `Promise`<`AudioBuffer`>

*Defined in [functions/loadAudioBuffer.ts:1](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/loadAudioBuffer.ts#L1)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| url | `string` |
| context | `AudioContext` |

**Returns:** `Promise`<`AudioBuffer`>

___
<a id="loopisinboundinteger"></a>

###  loopIsInBoundInteger

▸ **loopIsInBoundInteger**(playlist: *[IPlaylist](interfaces/iplaylist.md)*, loopedTimes: *`number`*): `boolean`

*Defined in [Manager/loopIsInBoundInteger.ts:5](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/loopIsInBoundInteger.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| playlist | [IPlaylist](interfaces/iplaylist.md) |
| loopedTimes | `number` |

**Returns:** `boolean`

___
<a id="loopisvalid"></a>

###  loopIsValid

▸ **loopIsValid**(value: *`any`*): `boolean`

*Defined in [Playlist/loopIsValid.ts:1](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Playlist/loopIsValid.ts#L1)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___
<a id="makesoundgroupidentifier"></a>

###  makeSoundGroupIdentifier

▸ **makeSoundGroupIdentifier**(value: *[TSoundGroupIdentifierArg](#tsoundgroupidentifierarg)*): [ISoundGroupIdentifier](interfaces/isoundgroupidentifier.md)

*Defined in [functions/makeSoundGroupIdentifier.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/makeSoundGroupIdentifier.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | [TSoundGroupIdentifierArg](#tsoundgroupidentifierarg) |

**Returns:** [ISoundGroupIdentifier](interfaces/isoundgroupidentifier.md)

___
<a id="nameorallkeys"></a>

###  nameOrAllKeys

▸ **nameOrAllKeys**<`T`>(name: *`string` | `null` | `undefined`*, collection: *[ICollection](interfaces/icollection.md)<`T`>*): `string` | `string`[]

*Defined in [functions/nameOrAllKeys.ts:5](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/nameOrAllKeys.ts#L5)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` | `null` | `undefined` |
| collection | [ICollection](interfaces/icollection.md)<`T`> |

**Returns:** `string` | `string`[]

___
<a id="normalizefadeprop"></a>

###  normalizeFadeProp

▸ **normalizeFadeProp**<`T`>(arg: *[IFadeProperty](interfaces/ifadeproperty.md)<`any`>*, valids: *[`boolean`, `boolean`]*, defaultValue: *`T` | `null`*): [IFadeProperty](interfaces/ifadeproperty.md)<`T`>

*Defined in [Fade/fadeUtils.ts:89](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/fadeUtils.ts#L89)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | [IFadeProperty](interfaces/ifadeproperty.md)<`any`> |
| valids | [`boolean`, `boolean`] |
| defaultValue | `T` | `null` |

**Returns:** [IFadeProperty](interfaces/ifadeproperty.md)<`T`>

___
<a id="playaudiosource"></a>

###  playAudioSource

▸ **playAudioSource**(sound: *[ISound](interfaces/isound.md)*, audioElement?: *`HTMLAudioElement` | `null`*): `void`

*Defined in [Sound/playAudioSource.ts:8](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/playAudioSource.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |
| `Optional` audioElement | `HTMLAudioElement` | `null` |

**Returns:** `void`

___
<a id="schedulehtmlaudiofades"></a>

###  scheduleHtmlAudioFades

▸ **scheduleHtmlAudioFades**(audioElement: *`HTMLAudioElement`*, updateFunc: *`function`*): `void`

*Defined in [Fade/scheduleHtmlAudioFades.ts:1](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/scheduleHtmlAudioFades.ts#L1)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| audioElement | `HTMLAudioElement` |
| updateFunc | `function` |

**Returns:** `void`

___
<a id="schedulewebaudiofadein"></a>

###  scheduleWebAudioFadeIn

▸ **scheduleWebAudioFadeIn**(sound: *[ISound](interfaces/isound.md)*): `void`

*Defined in [Fade/scheduleWebAudioFadeIn.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/scheduleWebAudioFadeIn.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |

**Returns:** `void`

___
<a id="schedulewebaudiofadeout"></a>

###  scheduleWebAudioFadeOut

▸ **scheduleWebAudioFadeOut**(sound: *[ISound](interfaces/isound.md)*): `void`

*Defined in [Fade/scheduleWebAudioFadeOut.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/scheduleWebAudioFadeOut.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |

**Returns:** `void`

___
<a id="schedulewebaudiofades"></a>

###  scheduleWebAudioFades

▸ **scheduleWebAudioFades**(sound: *[ISound](interfaces/isound.md)*): `void`

*Defined in [Fade/scheduleWebAudioFades.ts:17](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/scheduleWebAudioFades.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |

**Returns:** `void`

___
<a id="setperplaysoundoverrides"></a>

###  setPerPlaySoundOverrides

▸ **setPerPlaySoundOverrides**(sound: *[ISound](interfaces/isound.md)*, fadeOverride?: *[IFade](interfaces/ifade.md) | `null`*, loopOverride?: *`undefined` | `false` | `true`*): `void`

*Defined in [Sound/setPerPlaySoundOverrides.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/setPerPlaySoundOverrides.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |
| `Optional` fadeOverride | [IFade](interfaces/ifade.md) | `null` |
| `Optional` loopOverride | `undefined` | `false` | `true` |

**Returns:** `void`

___
<a id="shallowflattenarray"></a>

###  shallowFlattenArray

▸ **shallowFlattenArray**(array: *`any`[]*): `any`

*Defined in [functions/shallowFlattenArray.ts:1](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/shallowFlattenArray.ts#L1)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| array | `any`[] |

**Returns:** `any`

___
<a id="shouldloopplaylist"></a>

###  shouldLoopPlaylist

▸ **shouldLoopPlaylist**(playlist: *[IPlaylist](interfaces/iplaylist.md)*, loopedTimes: *`number`*): `boolean`

*Defined in [Manager/shouldLoopPlaylist.ts:8](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Manager/shouldLoopPlaylist.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| playlist | [IPlaylist](interfaces/iplaylist.md) |
| loopedTimes | `number` |

**Returns:** `boolean`

___
<a id="structurefadepropfromarray"></a>

###  structureFadePropFromArray

▸ **structureFadePropFromArray**<`T`>(arg: *[`T`, `T`]*): `object`

*Defined in [Fade/fadeUtils.ts:75](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/fadeUtils.ts#L75)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | [`T`, `T`] |

**Returns:** `object`

___
<a id="structurefadepropfromobject"></a>

###  structureFadePropFromObject

▸ **structureFadePropFromObject**<`T`>(arg: *[IFadeProperty](interfaces/ifadeproperty.md)<`T`>*): `object`

*Defined in [Fade/fadeUtils.ts:82](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/fadeUtils.ts#L82)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | [IFadeProperty](interfaces/ifadeproperty.md)<`T`> |

**Returns:** `object`

___
<a id="structurefadepropfromvalue"></a>

###  structureFadePropFromValue

▸ **structureFadePropFromValue**<`T`>(arg: *`T`*): `object`

*Defined in [Fade/fadeUtils.ts:68](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/fadeUtils.ts#L68)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | `T` |

**Returns:** `object`

___
<a id="structuresoundgroupidentifier"></a>

###  structureSoundGroupIdentifier

▸ **structureSoundGroupIdentifier**(soundName: *`string`*, groupName?: *`undefined` | `string`*): [ISoundGroupIdentifier](interfaces/isoundgroupidentifier.md)

*Defined in [functions/makeSoundGroupIdentifier.ts:32](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/makeSoundGroupIdentifier.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| soundName | `string` |
| `Optional` groupName | `undefined` | `string` |

**Returns:** [ISoundGroupIdentifier](interfaces/isoundgroupidentifier.md)

___
<a id="trysetsoundfade"></a>

###  trySetSoundFade

▸ **trySetSoundFade**(sound: *[ISound](interfaces/isound.md)*, value?: *[IFadeOptions](interfaces/ifadeoptions.md) | `boolean`*): `void`

*Defined in [Sound/trySetSoundFade.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/trySetSoundFade.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |
| `Optional` value | [IFadeOptions](interfaces/ifadeoptions.md) | `boolean` |

**Returns:** `void`

___
<a id="trysetsoundloop"></a>

###  trySetSoundLoop

▸ **trySetSoundLoop**(sound: *[ISound](interfaces/isound.md)*, value?: *`undefined` | `false` | `true`*): `void`

*Defined in [Sound/trySetSoundLoop.ts:5](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/trySetSoundLoop.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |
| `Optional` value | `undefined` | `false` | `true` |

**Returns:** `void`

___
<a id="trysetsoundtrackposition"></a>

###  trySetSoundTrackPosition

▸ **trySetSoundTrackPosition**(sound: *[ISound](interfaces/isound.md)*, value?: *`undefined` | `number`*): `void`

*Defined in [Sound/trySetSoundTrackPosition.ts:5](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/trySetSoundTrackPosition.ts#L5)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |
| `Optional` value | `undefined` | `number` |

**Returns:** `void`

___
<a id="trysetsoundvolume"></a>

###  trySetSoundVolume

▸ **trySetSoundVolume**(sound: *[ISound](interfaces/isound.md)*, value?: *`undefined` | `number`*): `void`

*Defined in [Sound/trySetSoundVolume.ts:8](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/trySetSoundVolume.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |
| `Optional` value | `undefined` | `number` |

**Returns:** `void`

___
<a id="updateaudiopanelelement"></a>

###  updateAudioPanelElement

▸ **updateAudioPanelElement**(manager: *[IManagerNode](interfaces/imanagernode.md) & [INodeCollectionSubmanager](interfaces/inodecollectionsubmanager.md)*, oldElem: *`HTMLElement`*): `HTMLDivElement`

*Defined in [functions/updateAudioPanelElement.ts:14](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/updateAudioPanelElement.ts#L14)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| manager | [IManagerNode](interfaces/imanagernode.md) & [INodeCollectionSubmanager](interfaces/inodecollectionsubmanager.md) |
| oldElem | `HTMLElement` |

**Returns:** `HTMLDivElement`

___
<a id="updatesoundtimes"></a>

###  updateSoundTimes

▸ **updateSoundTimes**(sound: *[ISound](interfaces/isound.md)*, audioElement?: *`HTMLAudioElement` | `null`*): `void`

*Defined in [Sound/updateSoundTimes.ts:11](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/updateSoundTimes.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| sound | [ISound](interfaces/isound.md) |
| `Optional` audioElement | `HTMLAudioElement` | `null` |

**Returns:** `void`

___
<a id="validatorwrapper"></a>

###  validatorWrapper

▸ **validatorWrapper**<`T`>(arg: *`any`*, validator: *`function`*): `boolean`

*Defined in [Fade/fadeUtils.ts:60](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/fadeUtils.ts#L60)*

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| arg | `any` |
| validator | `function` |

**Returns:** `boolean`

___
<a id="warn"></a>

###  warn

▸ **warn**(...messages: *`any`[]*): `void`

*Defined in [logging/warn.ts:7](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/logging/warn.ts#L7)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` messages | `any`[] |

**Returns:** `void`

___

## Object literals

<a id="funcs"></a>

### `<Const>` funcs

**funcs**: *`object`*

*Defined in [functions/getEasingFunction.ts:14](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getEasingFunction.ts#L14)*

<a id="funcs.__computed"></a>

####  __computed

▸ **__computed**(time: *`number`*, initial: *`number`*, change: *`number`*, duration: *`number`*): `number`

▸ **__computed**(time: *`number`*, initial: *`number`*, change: *`number`*, duration: *`number`*): `number`

▸ **__computed**(time: *`number`*, initial: *`number`*, change: *`number`*, duration: *`number`*): `number`

▸ **__computed**(time: *`number`*, initial: *`number`*, change: *`number`*, duration: *`number`*): `number`

▸ **__computed**(time: *`number`*, initial: *`number`*, change: *`number`*, duration: *`number`*): `number`

▸ **__computed**(time: *`number`*, initial: *`number`*, change: *`number`*, duration: *`number`*): `number`

▸ **__computed**(time: *`number`*, initial: *`number`*, change: *`number`*, duration: *`number`*): `number`

*Defined in [functions/getEasingFunction.ts:15](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getEasingFunction.ts#L15)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| time | `number` |
| initial | `number` |
| change | `number` |
| duration | `number` |

**Returns:** `number`

*Defined in [functions/getEasingFunction.ts:25](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getEasingFunction.ts#L25)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| time | `number` |
| initial | `number` |
| change | `number` |
| duration | `number` |

**Returns:** `number`

*Defined in [functions/getEasingFunction.ts:35](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getEasingFunction.ts#L35)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| time | `number` |
| initial | `number` |
| change | `number` |
| duration | `number` |

**Returns:** `number`

*Defined in [functions/getEasingFunction.ts:45](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getEasingFunction.ts#L45)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| time | `number` |
| initial | `number` |
| change | `number` |
| duration | `number` |

**Returns:** `number`

*Defined in [functions/getEasingFunction.ts:55](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getEasingFunction.ts#L55)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| time | `number` |
| initial | `number` |
| change | `number` |
| duration | `number` |

**Returns:** `number`

*Defined in [functions/getEasingFunction.ts:65](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getEasingFunction.ts#L65)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| time | `number` |
| initial | `number` |
| change | `number` |
| duration | `number` |

**Returns:** `number`

*Defined in [functions/getEasingFunction.ts:75](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/functions/getEasingFunction.ts#L75)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| time | `number` |
| initial | `number` |
| change | `number` |
| duration | `number` |

**Returns:** `number`

___

___
<a id="strings"></a>

### `<Const>` strings

**strings**: *`object`*

*Defined in [Sound/createSound.ts:20](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/createSound.ts#L20)*

<a id="strings.both_failed"></a>

####  BOTH_FAILED

**● BOTH_FAILED**: *`string`* = "Generating HTML5 Audio failed too. Cannot construct Sound."

*Defined in [Sound/createSound.ts:24](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/createSound.ts#L24)*

___
<a id="strings.fallback_warning"></a>

####  FALLBACK_WARNING

**● FALLBACK_WARNING**: *`string`* = "Manager is not in Web Audio mode. Falling back to HTML5 Audio."

*Defined in [Sound/createSound.ts:22](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/createSound.ts#L22)*

___
<a id="strings.html_audio_failed"></a>

####  HTML_AUDIO_FAILED

**● HTML_AUDIO_FAILED**: *`string`* = "Generating HTML5 Audio failed. Cannot construct Sound."

*Defined in [Sound/createSound.ts:25](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/createSound.ts#L25)*

___
<a id="strings.web_audio_failed"></a>

####  WEB_AUDIO_FAILED

**● WEB_AUDIO_FAILED**: *`string`* = "Loading Web Audio failed. Falling back to HTML5 audio."

*Defined in [Sound/createSound.ts:21](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Sound/createSound.ts#L21)*

___

___

