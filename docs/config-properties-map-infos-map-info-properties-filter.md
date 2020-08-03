## filter Type

`object` ([Filter](config-properties-map-infos-map-info-properties-filter.md))

# Filter Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                  |
| :------------------------ | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [layerNames](#layerNames) | `object` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-layernames.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/layerNames") |
| [phases](#phases)         | `object` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-phases.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/phases")         |
| [checkboxes](#checkboxes) | `object` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes") |
| [groups](#groups)         | `array`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-groups.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/groups")         |

## layerNames

Defines all of the layer names as they show up in the web map


`layerNames`

-   is optional
-   Type: `object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-layernames.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-layernames.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/layerNames")

### layerNames Type

`object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-layernames.md))

## phases

Defines the values associated with each phase for each layer. The property name should match a properties name from layerName and the value should be an array of strings with the first value being the field name and the next up to four values defining phases 1, 2, 3 & unfunded (in that order).


`phases`

-   is optional
-   Type: `object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-phases.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-phases.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/phases")

### phases Type

`object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-phases.md))

## checkboxes

Defines checkboxes for toggling visibility of one to many layers.


`checkboxes`

-   is optional
-   Type: `object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-checkboxes.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-checkboxes.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/checkboxes")

### checkboxes Type

`object` ([Details](config-properties-map-infos-map-info-properties-filter-properties-checkboxes.md))

## groups

Defines the checkbox groups.


`groups`

-   is optional
-   Type: `object[]` ([Details](config-properties-map-infos-map-info-properties-filter-properties-groups-items.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-filter-properties-groups.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/filter/properties/groups")

### groups Type

`object[]` ([Details](config-properties-map-infos-map-info-properties-filter-properties-groups-items.md))
