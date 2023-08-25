## filter Type

`object` ([Filter](config-properties-map-infos-map-info-properties-filter.md))

# filter Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                     |
| :------------------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [name](#name)             | `string` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-tab-specific-filter-name.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/name") |
| [toggle](#toggle)         | `object` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-toggle.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/toggle")                 |
| [layerNames](#layernames) | `object` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-layernames.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/layerNames")         |
| [phases](#phases)         | `object` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-phases.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/phases")                 |
| [modes](#modes)           | `object` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-modes.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/modes")                   |
| [checkboxes](#checkboxes) | `object` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes")         |
| [groups](#groups)         | `array`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-groups.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/groups")                 |

## name

Optionally configures the title of the filter panel. If this property is not set, "trans:filter" will be used.

`name`

*   is optional

*   Type: `string` ([Tab-specific Filter Name](config-properties-map-infos-map-info-properties-filter-properties-tab-specific-filter-name.md))

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-tab-specific-filter-name.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/name")

### name Type

`string` ([Tab-specific Filter Name](config-properties-map-infos-map-info-properties-filter-properties-tab-specific-filter-name.md))

## toggle

Configures the toggle buttons at the top of the filter in the transportation tab.

`toggle`

*   is optional

*   Type: `object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-toggle.md))

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-toggle.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/toggle")

### toggle Type

`object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-toggle.md))

## layerNames

Defines all of the layer names as they show up in the web map. The key is a unique id (whatever you want) for the layer. This key is used elsewhere in the filter config. The value is the name of the layer as defined in the web map.

`layerNames`

*   is optional

*   Type: `object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-layernames.md))

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-layernames.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/layerNames")

### layerNames Type

`object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-layernames.md))

## phases

Defines the values associated with each phase for each layer. The property name should match a properties name from layerName and the value should be an array of strings with the first value being the field name and the next up to four values defining phases 1, 2, 3 & unfunded (in that order).

`phases`

*   is optional

*   Type: `object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-phases.md))

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-phases.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/phases")

### phases Type

`object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-phases.md))

## modes

Defines the values associated with each mode for each layer. The property name should match a properties name from layerName and the value should be an array of strings with the first value being the field name and the next up to three values defining modes 'roads', 'transit', and 'bikePed' (in that order).

`modes`

*   is optional

*   Type: `object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-modes.md))

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-modes.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/modes")

### modes Type

`object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-modes.md))

## checkboxes

Defines checkboxes for toggling visibility of one to many layers.

`checkboxes`

*   is optional

*   Type: `object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-checkboxes.md))

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes")

### checkboxes Type

`object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-checkboxes.md))

## groups

Defines the checkbox groups.

`groups`

*   is optional

*   Type: `object[]` ([Group](config-properties-map-infos-map-info-properties-filter-properties-groups-group.md))

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-groups.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/groups")

### groups Type

`object[]` ([Group](config-properties-map-infos-map-info-properties-filter-properties-groups-group.md))
