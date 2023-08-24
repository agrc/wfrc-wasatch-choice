## items Type

`object` ([Query Filter Field](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field.md))

# items Properties

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                                                    |
| :------------------------ | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [label](#label)           | `string`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field-properties-label.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/fields/items/properties/label")           |
| [openOnLoad](#openonload) | `boolean` | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field-properties-openonload.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/fields/items/properties/openOnLoad") |
| [fieldName](#fieldname)   | `string`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field-properties-fieldname.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/fields/items/properties/fieldName")   |
| [fieldType](#fieldtype)   | `string`  | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field-properties-fieldtype.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/fields/items/properties/fieldType")   |
| [checkboxes](#checkboxes) | `array`   | Optional | cannot be null | [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field-properties-checkboxes.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/fields/items/properties/checkboxes") |

## label

The heading label for the field. Shows up in the app as a bold heading above the checkboxes.

`label`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field-properties-label.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/fields/items/properties/label")

### label Type

`string`

## openOnLoad

Controls whether or not the field section is open or closed by default

`openOnLoad`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field-properties-openonload.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/fields/items/properties/openOnLoad")

### openOnLoad Type

`boolean`

## fieldName

The name of the field as it is defined in the layer.

`fieldName`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field-properties-fieldname.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/fields/items/properties/fieldName")

### fieldName Type

`string`

## fieldType

Defines the field as either text or number. This is required for making valid SQL queries.

`fieldType`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field-properties-fieldtype.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/fields/items/properties/fieldType")

### fieldType Type

`string`

### fieldType Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value      | Explanation |
| :--------- | :---------- |
| `"text"`   |             |
| `"number"` |             |

## checkboxes

The list of checkboxes and associated values.

`checkboxes`

*   is optional

*   Type: `object[]` ([Query Filter Checkbox](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field-properties-checkboxes-query-filter-checkbox.md))

*   cannot be null

*   defined in: [WFRC App](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field-properties-checkboxes.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos/additionalProperties/properties/queryFilter/properties/fields/items/properties/checkboxes")

### checkboxes Type

`object[]` ([Query Filter Checkbox](config-properties-map-infos-map-info-properties-queryfilter-properties-fields-query-filter-field-properties-checkboxes-query-filter-checkbox.md))
