## additionalProperties Type

`object` ([Checkbox](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox.md))

one (and only one) of

-   [Untitled undefined type in WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-oneof-0.md "check type definition")
-   [Untitled undefined type in WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-oneof-1.md "check type definition")

# Checkbox Properties

| Property                            | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                                                                      |
| :---------------------------------- | --------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [label](#label)                     | `string`  | Required | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-label.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/label")                     |
| [layerNames](#layerNames)           | `array`   | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-layernames.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/layerNames")           |
| [offByDefault](#offByDefault)       | `boolean` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-offbydefault.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/offByDefault")       |
| [phase](#phase)                     | `number`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-phase.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/phase")                     |
| [symbol](#symbol)                   | `string`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-symbol.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/symbol")                   |
| [symbolImageFile](#symbolImageFile) | `string`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-symbolimagefile.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/symbolImageFile") |
| [symbolLayerIds](#symbolLayerIds)   | `array`   | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-symbollayerids.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/symbolLayerIds")   |
| [symbolLabels](#symbolLabels)       | `array`   | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-symbollabels.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/symbolLabels")       |
| [staticColors](#staticColors)       | `array`   | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-staticcolors.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/staticColors")       |
| [color](#color)                     | `string`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-color.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/color")                     |

## label




`label`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-label.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/label")

### label Type

`string`

## layerNames

Defines the layer(s) that you want to toggle. Values must match the property names of `layerNames` above.


`layerNames`

-   is optional
-   Type: `string[]`
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-layernames.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/layerNames")

### layerNames Type

`string[]`

## offByDefault

Set this to true to make the checkbox unchecked on load.


`offByDefault`

-   is optional
-   Type: `boolean`
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-offbydefault.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/offByDefault")

### offByDefault Type

`boolean`

## phase

Defines the zero-based index of the phase that this checkbox is associated with.


`phase`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-phase.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/phase")

### phase Type

`number`

## symbol

Defines the type of symbol component to be displayed.


`symbol`

-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-symbol.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/symbol")

### symbol Type

`string`

### symbol Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | ----------- |
| `"simple"`    |             |
| `"classes"`   |             |
| `"linePoint"` |             |
| `"phase"`     |             |
| `"dynamic"`   |             |
| `"static"`    |             |

## symbolImageFile

Defines the filename for the image that should be used with the static legend symbol. Note that the file needs to be placed in the root of the application.


`symbolImageFile`

-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-symbolimagefile.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/symbolImageFile")

### symbolImageFile Type

`string`

## symbolLayerIds

Defines the layer ids (as strings) for which you would like to show symbols. Up to three values may be specified. If you would like multiple symbols overlayed, separate them with a "," (e.g. "23,45"). If you would like to define a specific symbol class within a layer you can use "-<class index>" (e.g. "69-1"


`symbolLayerIds`

-   is optional
-   Type: `string[]`
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-symbollayerids.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/symbolLayerIds")

### symbolLayerIds Type

`string[]`

## symbolLabels

Optionally define text that will show in a popover when hovering over the associated symbol. Note that the order of this property should match the order of `symbolLayerIds`.


`symbolLabels`

-   is optional
-   Type: `string[]`
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-symbollabels.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/symbolLabels")

### symbolLabels Type

`string[]`

## staticColors

Used to define colors for the `staticColors` symbol type.


`staticColors`

-   is optional
-   Type: `object[]` ([Static Color](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-staticcolors-static-color.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-staticcolors.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/staticColors")

### staticColors Type

`object[]` ([Static Color](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-staticcolors-static-color.md))

## color

Used for the phase checkboxes. Defines the color as an rgb value. HSA may also work.


`color`

-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes-checkbox-properties-color.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes/additionalProperties/properties/color")

### color Type

`string`
