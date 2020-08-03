## WFRC App Type

`object` ([WFRC App](config.md))

# WFRC App Properties

| Property                                  | Type     | Required | Nullable       | Defined by                                                                                                                                       |
| :---------------------------------------- | -------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| [tabInfos](#tabInfos)                     | `object` | Required | cannot be null | [WFRC App](config-properties-tab-infos.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/tabInfos")                    |
| [sherlock](#sherlock)                     | `object` | Required | cannot be null | [WFRC App](config-properties-sherlock.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/sherlock")                     |
| [layerSelector](#layerSelector)           | `object` | Required | cannot be null | [WFRC App](config-properties-layerselector.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector")           |
| [minimumLegendSizes](#minimumLegendSizes) | `object` | Required | cannot be null | [WFRC App](config-properties-minimumlegendsizes.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/minimumLegendSizes") |
| [defaultExtent](#defaultExtent)           | `object` | Required | cannot be null | [WFRC App](config-properties-defaultextent.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/defaultExtent")           |
| [links](#links)                           | `object` | Required | cannot be null | [WFRC App](config-properties-links.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/links")                           |
| [tagLine](#tagLine)                       | `string` | Optional | cannot be null | [WFRC App](config-properties-tagline.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/tagLine")                       |
| [openOnLoad](#openOnLoad)                 | `object` | Required | cannot be null | [WFRC App](config-properties-openonload.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/openOnLoad")                 |
| [$schema](#$schema)                       | `string` | Optional | cannot be null | [WFRC App](config-properties-schema.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/$schema")                        |

## tabInfos

An object that describes each tab available in the application. The property name is the id for the tab and should not change since it's used as a URL parameter.


`tabInfos`

-   is required
-   Type: `object` ([Tab Infos](config-properties-tab-infos.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-tab-infos.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/tabInfos")

### tabInfos Type

`object` ([Tab Infos](config-properties-tab-infos.md))

## sherlock

Configuration options for the map search widget


`sherlock`

-   is required
-   Type: `object` ([Details](config-properties-sherlock.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-sherlock.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/sherlock")

### sherlock Type

`object` ([Details](config-properties-sherlock.md))

## layerSelector

Configuration options for the base map selector widget


`layerSelector`

-   is required
-   Type: `object` ([Details](config-properties-layerselector.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-layerselector.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector")

### layerSelector Type

`object` ([Details](config-properties-layerselector.md))

## minimumLegendSizes




`minimumLegendSizes`

-   is required
-   Type: `object` ([Details](config-properties-minimumlegendsizes.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-minimumlegendsizes.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/minimumLegendSizes")

### minimumLegendSizes Type

`object` ([Details](config-properties-minimumlegendsizes.md))

## defaultExtent




`defaultExtent`

-   is required
-   Type: `object` ([Details](config-properties-defaultextent.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-defaultextent.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/defaultExtent")

### defaultExtent Type

`object` ([Details](config-properties-defaultextent.md))

## links




`links`

-   is required
-   Type: `object` ([Details](config-properties-links.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-links.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/links")

### links Type

`object` ([Details](config-properties-links.md))

## tagLine

The text for the tag line element


`tagLine`

-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [WFRC App](config-properties-tagline.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/tagLine")

### tagLine Type

`string`

## openOnLoad

Controls whether specific map widgets default to be open on page load


`openOnLoad`

-   is required
-   Type: `object` ([Details](config-properties-openonload.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-openonload.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/openOnLoad")

### openOnLoad Type

`object` ([Details](config-properties-openonload.md))

## $schema

This should be set to <https://wfrc.org/wasatch-choice-map/config.schema.json>


`$schema`

-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [WFRC App](config-properties-schema.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/$schema")

### $schema Type

`string`

### $schema Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                                      | Explanation |
| :--------------------------------------------------------- | ----------- |
| `"https://wfrc.org/wasatch-choice-map/config.schema.json"` |             |
| `"./config.schema.json"`                                   |             |
