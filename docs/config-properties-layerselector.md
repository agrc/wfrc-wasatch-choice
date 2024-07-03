## layerSelector Type

`object` ([Details](config-properties-layerselector.md))

# layerSelector Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                    |
| :------------------------ | :------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [baseLayers](#baselayers) | `array`  | Optional | cannot be null | [WFRC App](config-properties-layerselector-properties-baselayers.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/baseLayers") |
| [overlays](#overlays)     | `array`  | Optional | cannot be null | [WFRC App](config-properties-layerselector-properties-overlays.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/overlays")     |
| [BWName](#bwname)         | `string` | Optional | cannot be null | [WFRC App](config-properties-layerselector-properties-bwname.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/BWName")         |
| [BWOpacity](#bwopacity)   | `string` | Optional | cannot be null | [WFRC App](config-properties-layerselector-properties-bwopacity.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/BWOpacity")   |

## baseLayers

The base layers to be displayed in the widget. Use a string value that matches the `BWName` value to create a black and white imagery layer.

`baseLayers`

* is optional

* Type: an array of merged types ([Details](config-properties-layerselector-properties-baselayers-items.md))

* cannot be null

* defined in: [WFRC App](config-properties-layerselector-properties-baselayers.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/baseLayers")

### baseLayers Type

an array of merged types ([Details](config-properties-layerselector-properties-baselayers-items.md))

## overlays



`overlays`

* is optional

* Type: an array of merged types ([Details](config-properties-layerselector-properties-overlays-items.md))

* cannot be null

* defined in: [WFRC App](config-properties-layerselector-properties-overlays.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/overlays")

### overlays Type

an array of merged types ([Details](config-properties-layerselector-properties-overlays-items.md))

## BWName

The name of the black and white imagery layer token in the baseLayers array

`BWName`

* is optional

* Type: `string`

* cannot be null

* defined in: [WFRC App](config-properties-layerselector-properties-bwname.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/BWName")

### BWName Type

`string`

## BWOpacity

The opacity of the black and white imagery layer expressed as a percentage (e.g. 75%)

`BWOpacity`

* is optional

* Type: `string`

* cannot be null

* defined in: [WFRC App](config-properties-layerselector-properties-bwopacity.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/BWOpacity")

### BWOpacity Type

`string`
