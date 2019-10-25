# Schema

```

```

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------- |
| Can be instantiated | No         | Experimental | No           | Forbidden         | Forbidden             |            |

# Properties

| Property                                  | Type       | Required     | Nullable | Defined by    |
| ----------------------------------------- | ---------- | ------------ | -------- | ------------- |
| [defaultExtent](#defaultextent)           | `object`   | **Required** | No       | (this schema) |
| [layerSelector](#layerselector)           | `object`   | **Required** | No       | (this schema) |
| [links](#links)                           | `object`   | **Required** | No       | (this schema) |
| [minimumLegendSizes](#minimumlegendsizes) | `object`   | **Required** | No       | (this schema) |
| [openOnLoad](#openonload)                 | `object`   | **Required** | No       | (this schema) |
| [sherlock](#sherlock)                     | `object`   | **Required** | No       | (this schema) |
| [tabs](#tabs)                             | `object[]` | **Required** | No       | (this schema) |
| [tagLine](#tagline)                       | `string`   | Optional     | No       | (this schema) |

## defaultExtent

`defaultExtent`

- is **required**
- type: `object`
- defined in this schema

### defaultExtent Type

`object` with following properties:

| Property    | Type   | Required     |
| ----------- | ------ | ------------ |
| `x`         | number | **Required** |
| `y`         | number | **Required** |
| `zoomLevel` | number | **Required** |

#### x

`x`

- is **required**
- type: `number`

##### x Type

`number`

#### y

`y`

- is **required**
- type: `number`

##### y Type

`number`

#### zoomLevel

`zoomLevel`

- is **required**
- type: `number`

##### zoomLevel Type

`number`

## layerSelector

Configuration options for the base map selector widget

`layerSelector`

- is **required**
- type: `object`
- defined in this schema

### layerSelector Type

`object` with following properties:

| Property     | Type  | Required |
| ------------ | ----- | -------- |
| `baseLayers` | array | Optional |
| `overlays`   | array | Optional |

#### baseLayers

`baseLayers`

- is optional
- type: `array`

##### baseLayers Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

`string`

#### Option 2

`object` with following properties:

| Property      | Type   | Required     |
| ------------- | ------ | ------------ |
| `Factory`     | string | **Required** |
| `id`          | string | **Required** |
| `urlTemplate` | string | **Required** |

#### Factory

The name of the esrijs module associated with the layer type

`Factory`

- is **required**
- type: `string`

##### Factory Type

`string`

#### id

The name of the layer

`id`

- is **required**
- type: `string`

##### id Type

`string`

#### urlTemplate

The urlTemplate for the layer. "{quadWord}" will be automatically replaced with the appropriate value at runtime.

`urlTemplate`

- is **required**
- type: `string`

##### urlTemplate Type

`string`

#### overlays

`overlays`

- is optional
- type: `array`

##### overlays Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

`string`

#### Option 2

`object` with following properties:

| Property  | Type   | Required     |
| --------- | ------ | ------------ |
| `Factory` | string | **Required** |
| `id`      | string | **Required** |
| `opacity` | number | Optional     |
| `url`     | string | **Required** |

#### Factory

The name of the esrijs module associated with the layer type

`Factory`

- is **required**
- type: `string`

##### Factory Type

`string`

#### id

The name of the layer

`id`

- is **required**
- type: `string`

##### id Type

`string`

#### opacity

`opacity`

- is optional
- type: `number`

##### opacity Type

`number`

#### url

The url for the layer

`url`

- is **required**
- type: `string`

##### url Type

`string`

## links

`links`

- is **required**
- type: `object`
- defined in this schema

### links Type

`object` with following properties:

| Property      | Type   | Required |
| ------------- | ------ | -------- |
| `landingPage` | string | Optional |
| `tagLine`     | string | Optional |

#### landingPage

This is the URL for the links on the logo (larger screens) and "Wasatch Choice" tab link (smaller screens)

`landingPage`

- is optional
- type: `string`

##### landingPage Type

`string`

#### tagLine

This is the URL for the tag line link. If there the value is an empty string, then the link becomes just a span that is
not clickable.

`tagLine`

- is optional
- type: `string`

##### tagLine Type

`string`

## minimumLegendSizes

`minimumLegendSizes`

- is **required**
- type: `object`
- defined in this schema

### minimumLegendSizes Type

`object` with following properties:

| Property        | Type   | Required     |
| --------------- | ------ | ------------ |
| `pointSize`     | number | **Required** |
| `polylineWidth` | number | **Required** |

#### pointSize

`pointSize`

- is **required**
- type: `number`

##### pointSize Type

`number`

#### polylineWidth

`polylineWidth`

- is **required**
- type: `number`

##### polylineWidth Type

`number`

## openOnLoad

Controls whether specific map widgets default to be open on page load

`openOnLoad`

- is **required**
- type: `object`
- defined in this schema

### openOnLoad Type

`object` with following properties:

| Property      | Type    | Required |
| ------------- | ------- | -------- |
| `filter`      | boolean | Optional |
| `projectInfo` | boolean | Optional |

#### filter

`filter`

- is optional
- type: `boolean`

##### filter Type

`boolean`

#### projectInfo

`projectInfo`

- is optional
- type: `boolean`

##### projectInfo Type

`boolean`

## sherlock

Configuration options for the map search widget

`sherlock`

- is **required**
- type: `object`
- defined in this schema

### sherlock Type

`object` with following properties:

| Property      | Type   | Required     |
| ------------- | ------ | ------------ |
| `placeHolder` | string | Optional     |
| `searchField` | string | **Required** |
| `serviceUrl`  | string | **Required** |

#### placeHolder

The place holder text that shows up in the text box before a user starts typing.

`placeHolder`

- is optional
- type: `string`

##### placeHolder Type

`string`

#### searchField

The name of the field that you would like the search to be applied to.

`searchField`

- is **required**
- type: `string`

##### searchField Type

`string`

#### serviceUrl

The URL to the service that you would like to search features on.

`serviceUrl`

- is **required**
- type: `string`

##### serviceUrl Type

`string`

## tabs

`tabs`

- is **required**
- type: `object[]`
- defined in this schema

### tabs Type

Array type: `object[]`

All items must be of the type: `object` with following properties:

| Property              | Type    | Required     | Default |
| --------------------- | ------- | ------------ | ------- |
| `filter`              | object  | Optional     |         |
| `hideLayerSelector`   | boolean | Optional     | `false` |
| `name`                | string  | **Required** |         |
| `useDefaultAGOLPopup` | boolean | Optional     |         |
| `webMapId`            | string  | **Required** |         |

#### filter

Contains configs for the filter widget.

`filter`

- is optional
- type: `object`

##### filter Type

`object` with following properties:

| Property     | Type   | Required |
| ------------ | ------ | -------- |
| `checkboxes` | object | Optional |
| `groups`     | array  | Optional |
| `layerNames` | object | Optional |
| `phases`     | object | Optional |

#### checkboxes

Defines checkboxes for toggling visibility of one to many layers.

`checkboxes`

- is optional
- type: `object`

##### checkboxes Type

`object` with following properties:

| Property | Type | Required |
| -------- | ---- | -------- |


#### groups

Defines the checkbox groups.

`groups`

- is optional
- type: `object[]`

##### groups Type

Array type: `object[]`

All items must be of the type: `object` with following properties:

| Property              | Type    | Required     |
| --------------------- | ------- | ------------ |
| `checkboxes`          | array   | **Required** |
| `label`               | string  | **Required** |
| `radio`               | boolean | Optional     |
| `showFilterByPhasing` | boolean | Optional     |

#### checkboxes

Checkboxes to be included in the group. Values must match the property names for `checkboxes` above.

`checkboxes`

- is **required**
- type: `string[]`

##### checkboxes Type

Array type: `string[]`

All items must be of the type: `string`

#### label

`label`

- is **required**
- type: `string`

##### label Type

`string`

#### radio

Controls whether the children are checkboxes or radio buttons.

`radio`

- is optional
- type: `boolean`

##### radio Type

`boolean`

#### showFilterByPhasing

Controls whether the "(filter by phasing)" checkbox is displayed

`showFilterByPhasing`

- is optional
- type: `boolean`

##### showFilterByPhasing Type

`boolean`

#### layerNames

Defines all of the layer names as they show up in the web map

`layerNames`

- is optional
- type: `object`

##### layerNames Type

`object` with following properties:

| Property | Type | Required |
| -------- | ---- | -------- |


#### phases

Defines the values associated with each phase for each layer. The property name should match a properties name from
layerName and the value should be an array of strings with the first value being the field name and the next up to four
values defining phases 1, 2, 3 & unfunded (in that order).

`phases`

- is optional
- type: `object`

##### phases Type

`object` with following properties:

| Property | Type | Required |
| -------- | ---- | -------- |


#### hideLayerSelector

Determines whether the layer selector widget is displayed or not

`hideLayerSelector`

- is optional
- type: `boolean`
- default: `false`

##### hideLayerSelector Type

`boolean`

#### name

The name of the tab that shows up in the actual tab control

`name`

- is **required**
- type: `string`

##### name Type

`string`

#### useDefaultAGOLPopup

`useDefaultAGOLPopup`

- is optional
- type: `boolean`

##### useDefaultAGOLPopup Type

`boolean`

#### webMapId

The id of the web map that you would like displayed in the tab

`webMapId`

- is **required**
- type: `string`

##### webMapId Type

`string`

## tagLine

The text for the tag line element

`tagLine`

- is optional
- type: `string`
- defined in this schema

### tagLine Type

`string`
