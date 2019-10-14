# Schema

```

```

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------- |
| Can be instantiated | No         | Experimental | No           | Forbidden         | Permitted             |            |

# Properties

| Property                                  | Type       | Required     | Nullable | Defined by                                 |
| ----------------------------------------- | ---------- | ------------ | -------- | ------------------------------------------ |
| [defaultExtent](#defaultextent)           | `object`   | **Required** | No       | (this schema)                              |
| [layerSelector](#layerselector)           | `object`   | **Required** | No       | (this schema)                              |
| [links](#links)                           | `object`   | **Required** | No       | (this schema)                              |
| [minimumLegendSizes](#minimumlegendsizes) | `object`   | **Required** | No       | (this schema)                              |
| [sherlock](#sherlock)                     | `object`   | **Required** | No       | (this schema)                              |
| [tabs](#tabs)                             | `object[]` | **Required** | No       | (this schema)                              |
| `*`                                       | any        | Additional   | Yes      | this schema _allows_ additional properties |

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
- type: multiple

##### baseLayers Type

Array type: multiple

All items must be of the type: Unknown type `object,string`.

```json
{
  "type": "array",
  "items": {
    "type": ["object", "string"],
    "properties": {
      "id": {
        "description": "The name of the layer",
        "type": "string"
      },
      "Factory": {
        "description": "The name of the esrijs module associated with the layer type",
        "type": "string"
      },
      "urlTemplate": {
        "description": "The urlTemplate for the layer. \"{quadWord}\" will be automatically replaced with the appropriate value at runtime.",
        "type": "string"
      }
    },
    "required": ["id", "Factory", "urlTemplate"],
    "simpletype": "multiple"
  },
  "simpletype": "multiple"
}
```

#### overlays

`overlays`

- is optional
- type: multiple

##### overlays Type

Array type: multiple

All items must be of the type: Unknown type `object,string`.

```json
{
  "type": "array",
  "items": {
    "type": ["object", "string"],
    "properties": {
      "id": {
        "description": "The name of the layer",
        "type": "string"
      },
      "Factory": {
        "description": "The name of the esrijs module associated with the layer type",
        "type": "string"
      },
      "url": {
        "description": "The url for the layer",
        "type": "string"
      },
      "opacity": {
        "type": "number"
      }
    },
    "required": ["id", "Factory", "url"],
    "simpletype": "multiple"
  },
  "simpletype": "multiple"
}
```

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

#### landingPage

This is the URL for the links on the logo (larger screens) and "Wasatch Choice" tab link (smaller screens)

`landingPage`

- is optional
- type: `string`

##### landingPage Type

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
