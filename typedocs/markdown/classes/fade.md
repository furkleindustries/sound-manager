[sound-manager](../README.md) > [Fade](../classes/fade.md)

# Class: Fade

## Hierarchy

**Fade**

## Implements

* [IFade](../interfaces/ifade.md)

## Index

### Constructors

* [constructor](fade.md#constructor)

### Properties

* [defaultCurve](fade.md#defaultcurve)
* [defaultLength](fade.md#defaultlength)

### Object literals

* [easingCurve](fade.md#easingcurve)
* [length](fade.md#length)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Fade**(options?: *[IFadeOptions](../interfaces/ifadeoptions.md)*): [Fade](fade.md)

*Defined in [Fade/Fade.ts:29](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/Fade.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [IFadeOptions](../interfaces/ifadeoptions.md) |

**Returns:** [Fade](fade.md)

___

## Properties

<a id="defaultcurve"></a>

### `<Static>` defaultCurve

**● defaultCurve**: *[EasingCurves](../enums/easingcurves.md)* =  EasingCurves.Quadratic

*Defined in [Fade/Fade.ts:18](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/Fade.ts#L18)*

___
<a id="defaultlength"></a>

### `<Static>` defaultLength

**● defaultLength**: *`number`* = 2

*Defined in [Fade/Fade.ts:19](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/Fade.ts#L19)*

___

## Object literals

<a id="easingcurve"></a>

###  easingCurve

**easingCurve**: *`object`*

*Implementation of [IFade](../interfaces/ifade.md).[easingCurve](../interfaces/ifade.md#easingcurve)*

*Defined in [Fade/Fade.ts:21](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/Fade.ts#L21)*

<a id="easingcurve.in"></a>

####  in

**● in**: *[EasingCurves](../enums/easingcurves.md)* =  Fade.defaultCurve

*Defined in [Fade/Fade.ts:22](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/Fade.ts#L22)*

___
<a id="easingcurve.out"></a>

####  out

**● out**: *[EasingCurves](../enums/easingcurves.md)* =  Fade.defaultCurve

*Defined in [Fade/Fade.ts:23](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/Fade.ts#L23)*

___

___
<a id="length"></a>

###  length

**length**: *`object`*

*Implementation of [IFade](../interfaces/ifade.md).[length](../interfaces/ifade.md#length)*

*Defined in [Fade/Fade.ts:26](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/Fade.ts#L26)*

<a id="length.in-1"></a>

####  in

**● in**: *`number`* =  Fade.defaultLength

*Defined in [Fade/Fade.ts:27](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/Fade.ts#L27)*

___
<a id="length.out-1"></a>

####  out

**● out**: *`number`* =  Fade.defaultLength

*Defined in [Fade/Fade.ts:28](https://github.com/furkleindustries/sound-manager/blob/087d8cb/src/Fade/Fade.ts#L28)*

___

___

