## WFRC App Type

`object` ([WFRC App](config.md))

# WFRC App Properties

| Property                                  | Type      | Required | Nullable       | Defined by                                                                                                                                       |
| :---------------------------------------- | --------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| [mapInfos](#mapInfos)                     | `object`  | Required | cannot be null | [WFRC App](config-properties-map-infos.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos")                    |
| [sherlock](#sherlock)                     | `object`  | Required | cannot be null | [WFRC App](config-properties-sherlock.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/sherlock")                     |
| [layerSelector](#layerSelector)           | `object`  | Required | cannot be null | [WFRC App](config-properties-layerselector.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector")           |
| [minimumLegendSizes](#minimumLegendSizes) | `object`  | Required | cannot be null | [WFRC App](config-properties-minimumlegendsizes.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/minimumLegendSizes") |
| [defaultExtent](#defaultExtent)           | `object`  | Required | cannot be null | [WFRC App](config-properties-defaultextent.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/defaultExtent")           |
| [links](#links)                           | `object`  | Required | cannot be null | [WFRC App](config-properties-links.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/links")                           |
| [openOnLoad](#openOnLoad)                 | `object`  | Required | cannot be null | [WFRC App](config-properties-openonload.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/openOnLoad")                 |
| [translations](#translations)             | `object`  | Required | cannot be null | [WFRC App](config-properties-translations.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/translations")             |
| [maxTabsAllowed](#maxTabsAllowed)         | `integer` | Required | cannot be null | [WFRC App](config-properties-max-tabs-allowed.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/maxTabsAllowed")       |
| [$schema](#$schema)                       | `string`  | Optional | cannot be null | [WFRC App](config-properties-schema.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/$schema")                        |

## mapInfos

An object that describes each map available in the application. The property name is the id for the map and should not change since it's used as a URL parameter.


`mapInfos`

-   is required
-   Type: `object` ([Map Infos](config-properties-map-infos.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-map-infos.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/mapInfos")

### mapInfos Type

`object` ([Map Infos](config-properties-map-infos.md))

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

## openOnLoad

Controls whether specific map widgets default to be open on page load


`openOnLoad`

-   is required
-   Type: `object` ([Details](config-properties-openonload.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-openonload.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/openOnLoad")

### openOnLoad Type

`object` ([Details](config-properties-openonload.md))

## translations

Contains the translated strings used in the app. Falls back to `en` if there is no other translation. Most strings in the other configs can be translated by using this format: `trans:<key>`. For example: `trans:visionMapTitle`.


`translations`

-   is required
-   Type: `object` ([Translations](config-properties-translations.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-translations.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/translations")

### translations Type

`object` ([Translations](config-properties-translations.md))

## maxTabsAllowed

Restricts the number of tabs that a user is allowed to add.


`maxTabsAllowed`

-   is required
-   Type: `integer` ([Max Tabs Allowed](config-properties-max-tabs-allowed.md))
-   cannot be null
-   defined in: [WFRC App](config-properties-max-tabs-allowed.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/properties/maxTabsAllowed")

### maxTabsAllowed Type

`integer` ([Max Tabs Allowed](config-properties-max-tabs-allowed.md))

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

# WFRC App Definitions

## Definitions group translation

Reference this group by using

```json
{"$ref":"https://wfrc.org/wasatch-choice-map/config.schema.json#/definitions/translation"}
```

| Property                        | Type     | Required | Nullable       | Defined by                                                                                                                                                                             |
| :------------------------------ | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [mapTabsDialog](#mapTabsDialog) | `object` | Optional | cannot be null | [WFRC App](config-definitions-translation-properties-maptabsdialog.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/definitions/translation/properties/mapTabsDialog") |
| Additional Properties           | Merged   | Optional | cannot be null | [WFRC App](config-definitions-translation-additionalproperties.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/definitions/translation/additionalProperties")         |

### mapTabsDialog




`mapTabsDialog`

-   is optional
-   Type: `object` ([Details](config-definitions-translation-properties-maptabsdialog.md))
-   cannot be null
-   defined in: [WFRC App](config-definitions-translation-properties-maptabsdialog.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/definitions/translation/properties/mapTabsDialog")

#### mapTabsDialog Type

`object` ([Details](config-definitions-translation-properties-maptabsdialog.md))

### Additional Properties

Additional properties are allowed, as long as they follow this schema:




-   is optional
-   Type: merged type ([Details](config-definitions-translation-additionalproperties.md))
-   cannot be null
-   defined in: [WFRC App](config-definitions-translation-additionalproperties.md "https&#x3A;//wfrc.org/wasatch-choice-map/config.schema.json#/definitions/translation/additionalProperties")

#### additionalProperties Type

merged type ([Details](config-definitions-translation-additionalproperties.md))

one (and only one) of

-   [Untitled string in WFRC App](config-definitions-translation-additionalproperties-oneof-0.md "check type definition")
-   [Untitled object in WFRC App](config-definitions-translation-additionalproperties-oneof-1.md "check type definition")
