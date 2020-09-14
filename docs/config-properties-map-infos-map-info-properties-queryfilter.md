## queryFilter Type

`object` ([QueryFilter](config-properties-map-infos-map-info-properties-queryfilter.md))

# QueryFilter Properties

| Property                | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                          |
| :---------------------- | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [layerName](#layerName) | `string` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-layername.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/layerName") |
| [fields](#fields)       | `array`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-fields.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/fields")       |

## layerName

Defines the layer name that this widget is wired up to as it is defined in the web map


`layerName`

-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-layername.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/layerName")

### layerName Type

`string`

## fields

Contains a list of field objects that are associated with this widget.


`fields`

-   is optional
-   Type: `object[]` ([Query Filter Field](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-fields.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/fields")

### fields Type

`object[]` ([Query Filter Field](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field.md))
