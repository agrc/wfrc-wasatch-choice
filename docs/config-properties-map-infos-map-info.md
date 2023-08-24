## additionalProperties Type

`object` ([Map Info](config-properties-map-infos-map-info.md))

# additionalProperties Properties

| Property                                    | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                           |
| :------------------------------------------ | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [name](#name)                               | `string`  | Required | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-name.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/name")                               |
| [category](#category)                       | `string`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-category.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/category")                       |
| [webMapId](#webmapid)                       | `string`  | Required | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-webmapid.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/webMapId")                       |
| [hideLayerSelector](#hidelayerselector)     | `boolean` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-hidelayerselector.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/hideLayerSelector")     |
| [useDefaultAGOLPopup](#usedefaultagolpopup) | `boolean` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-usedefaultagolpopup.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/useDefaultAGOLPopup") |
| [filter](#filter)                           | `object`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter")                           |
| [queryFilter](#queryfilter)                 | `object`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-queryfilter.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter")                 |

## name

The name of the map that shows up in the tab control

`name`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-name.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/name")

### name Type

`string`

## category

The category that this map should be under in the configure maps dialog box. This is optional and translatable

`category`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-category.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/category")

### category Type

`string`

## webMapId

The id of the web map that you would like displayed

`webMapId`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-webmapid.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/webMapId")

### webMapId Type

`string`

## hideLayerSelector

Determines whether the layer selector widget is displayed or not

`hideLayerSelector`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-hidelayerselector.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/hideLayerSelector")

### hideLayerSelector Type

`boolean`

## useDefaultAGOLPopup



`useDefaultAGOLPopup`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-usedefaultagolpopup.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/useDefaultAGOLPopup")

### useDefaultAGOLPopup Type

`boolean`

## filter

Contains configs for the Filter widget.

`filter`

*   is optional

*   Type: `object` ([Filter](config-properties-map-infos-map-info-properties-filter.md))

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter")

### filter Type

`object` ([Filter](config-properties-map-infos-map-info-properties-filter.md))

## queryFilter

Contains configs for the Query Filter widget.

`queryFilter`

*   is optional

*   Type: `object` ([QueryFilter](config-properties-map-infos-map-info-properties-queryfilter.md))

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-queryfilter.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter")

### queryFilter Type

`object` ([QueryFilter](config-properties-map-infos-map-info-properties-queryfilter.md))
