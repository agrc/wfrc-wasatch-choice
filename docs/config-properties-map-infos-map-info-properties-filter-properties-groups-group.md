## items Type

`object` ([Group](config-properties-map-infos-map-info-properties-filter-properties-groups-group.md))

# items Properties

| Property                                    | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                                               |
| :------------------------------------------ | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [label](#label)                             | `string`  | Required | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-groups-group-properties-label.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/groups/items/properties/label")                             |
| [checkboxes](#checkboxes)                   | `array`   | Required | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-groups-group-properties-checkboxes.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/groups/items/properties/checkboxes")                   |
| [radio](#radio)                             | `boolean` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-groups-group-properties-radio.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/groups/items/properties/radio")                             |
| [showFilterByPhasing](#showfilterbyphasing) | `boolean` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-groups-group-properties-showfilterbyphasing.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/groups/items/properties/showFilterByPhasing") |

## label



`label`

* is required

* Type: `string`

* cannot be null

* defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-groups-group-properties-label.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/groups/items/properties/label")

### label Type

`string`

## checkboxes

Checkboxes to be included in the group. Values must match the property names for `checkboxes` above.

`checkboxes`

* is required

* Type: `string[]`

* cannot be null

* defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-groups-group-properties-checkboxes.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/groups/items/properties/checkboxes")

### checkboxes Type

`string[]`

## radio

Controls whether the children are checkboxes or radio buttons.

`radio`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-groups-group-properties-radio.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/groups/items/properties/radio")

### radio Type

`boolean`

## showFilterByPhasing

Controls whether the "(filter by phasing)" checkbox is displayed

`showFilterByPhasing`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-groups-group-properties-showfilterbyphasing.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/groups/items/properties/showFilterByPhasing")

### showFilterByPhasing Type

`boolean`
