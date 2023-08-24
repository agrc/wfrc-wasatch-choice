## 1 Type

`object` ([Details](config-properties-layerselector-properties-baselayers-items-anyof-1.md))

# 1 Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                              |
| :-------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [id](#id)                   | `string` | Required | cannot be null | [WFRC App](config-properties-layerselector-properties-baselayers-items-anyof-1-properties-id.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/baseLayers/items/anyOf/1/properties/id")                   |
| [Factory](#factory)         | `string` | Required | cannot be null | [WFRC App](config-properties-layerselector-properties-baselayers-items-anyof-1-properties-factory.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/baseLayers/items/anyOf/1/properties/Factory")         |
| [urlTemplate](#urltemplate) | `string` | Required | cannot be null | [WFRC App](config-properties-layerselector-properties-baselayers-items-anyof-1-properties-urltemplate.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/baseLayers/items/anyOf/1/properties/urlTemplate") |

## id

The name of the layer

`id`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [WFRC App](config-properties-layerselector-properties-baselayers-items-anyof-1-properties-id.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/baseLayers/items/anyOf/1/properties/id")

### id Type

`string`

## Factory

The name of the esrijs module associated with the layer type

`Factory`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [WFRC App](config-properties-layerselector-properties-baselayers-items-anyof-1-properties-factory.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/baseLayers/items/anyOf/1/properties/Factory")

### Factory Type

`string`

## urlTemplate

The urlTemplate for the layer. "{quadWord}" will be automatically replaced with the appropriate value at runtime.

`urlTemplate`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [WFRC App](config-properties-layerselector-properties-baselayers-items-anyof-1-properties-urltemplate.md "https://wfrc.org/wasatch-choice-map/config.schema.json#/properties/layerSelector/properties/baseLayers/items/anyOf/1/properties/urlTemplate")

### urlTemplate Type

`string`
