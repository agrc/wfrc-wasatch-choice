# Schema

```
https://wfrc.org/wasatch-choice-map/configSchema.json
```

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------- |
| Can be instantiated | No         | Experimental | No           | Forbidden         | Forbidden             |            |

# Properties

| Property                                  | Type     | Required     | Nullable | Defined by    |
| ----------------------------------------- | -------- | ------------ | -------- | ------------- |
| [\$schema](#schema)                       | `string` | Optional     | No       | (this schema) |
| [defaultExtent](#defaultextent)           | `object` | **Required** | No       | (this schema) |
| [layerSelector](#layerselector)           | `object` | **Required** | No       | (this schema) |
| [links](#links)                           | `object` | **Required** | No       | (this schema) |
| [minimumLegendSizes](#minimumlegendsizes) | `object` | **Required** | No       | (this schema) |
| [openOnLoad](#openonload)                 | `object` | **Required** | No       | (this schema) |
| [sherlock](#sherlock)                     | `object` | **Required** | No       | (this schema) |
| [tabInfos](#tabinfos)                     | `object` | **Required** | No       | (this schema) |
| [tagLine](#tagline)                       | `string` | Optional     | No       | (this schema) |

## \$schema

`$schema`

- is optional
- type: `string`
- defined in this schema

### \$schema Type

`string`

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

## tabInfos

An object that describes each tab available in the application. The property name is the id for the tab and should not
change since it's used as a URL parameter.

`tabInfos`

- is **required**
- type: `object`
- defined in this schema

### tabInfos Type

`object` with following properties:

| Property | Type | Required |
| -------- | ---- | -------- |


## tagLine

The text for the tag line element

`tagLine`

- is optional
- type: `string`
- defined in this schema

### tagLine Type

`string`
