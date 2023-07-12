# WFRC - Wasatch Choice Interactive Map [![Node.js CI](https://github.com/agrc/wfrc-wasatch-choice/actions/workflows/nodejs.yml/badge.svg)](https://github.com/agrc/wfrc-wasatch-choice/actions/workflows/nodejs.yml)

[mockups](https://docs.google.com/presentation/d/1m30EQch-gXr4IczSRmM9TthAMsiAgCITS3Qo9C-tZkU/edit#slide=id.g5750aa3557_0_0)  
[map ledge mockup](https://docs.google.com/presentation/d/1IchwcqjPA9lqFt9WJul7BXwl0gMJ-FNSflO31qot9K4/edit#slide=id.g8363e6d01f_1_0)  
[tab configurations](https://docs.google.com/spreadsheets/u/1/d/1BFA3-PcDI07CYR7JloeXjB78NNtnTDieRBY-ELnzsjI/edit#gid=0)  
[production](https://wfrc.org/wasatch-choice-map)  
[staging](https://test.mapserv.utah.gov/wfrc/)  
[multi select UX article](https://medium.com/tripaneer-techblog/improving-the-usability-of-multi-selecting-from-a-long-list-63e1a67aab35)

## Configuration

The app is configured via a few JSON files located at the root of the deployed project. In development they are located in `./public`.

### `config.json`

This is where all of the app configuration except the about widget is contained.

See [docs/config.md](docs/config.md) for details on configuring this file. At runtime, the app validates `config.json` against this schema file and prints any errors to the console.

#### Adding new maps

To add a new map to the application, a new property needs to be added to the `mapInfos` object. The required schema for this object is found [here](docs/config-properties-map-infos-map-info.md). Any web map should work. If you want to be able to use the Layer Selector widget (`"hideLayerSelector": false`), the web map needs to have a base map that is fully transparent. It's kind of a hack, but it's the only way to allow the Layer Selector widget to switch out base maps.

Sample Config

```json
"mapInfos": {
  "vision": {
    "name": "Vision",
    "webMapId": "7a4843b43cf84f00bbe7b2c2d3985236",
    "hideLayerSelector": true,
    "useDefaultAGOLPopup": false,
    "filter": ...
  },
  ...
}
```

The first five maps in `mapInfos` will be the default tabs in the order that they are defined.

### About Widget Content

`public/about/<locale>/<mapId>.html`

These files contain the content that will show up in the about widget (left side panel). The file names correspond to the `mapInfos` keys in `config.json`.

The `/about-tests` page displays all of the about widget content in a single page. This can be helpful during development of the content.

### Internationalization

This application is fulling translatable using the `translations` property of `config.json`. Each language has it's own property of that object (e.g. `en`=english, `es`=spanish). Translations default to english if no other value is provided. If you want to provide a translation for any values in the other configs you add a new value to the `translations` object and then use it in the configs with a special prefix, `trans:` (e.g. `trans:newKey`). For example, if I wanted to make the vision map label translatable:

```json
{
  "mapInfos": {
    "vision": {
      "name": "trans:visionMapTitle"
      ...
    }
  },
  ...
  "translations": {
    "en": {
      "translation": {
        "visionMapTitle": "Vision",
        ...
      }
    },
    "es": {
      "translation": {
        "visionMapTitle": "Visión",
        ...
      }
    }
  }
}
```

The current language should be automatically detected from the user's browser. If you want to force the app into a certain language, use the `lng` URL parameter. For example:

`<app URL>/#lng=es`

## Development & Testing

Create and populate `.env.local` based on `.env`

Execute `npm start` to start a web server and view the website

Execute `npm test` to run tests

## Build

Execute `npm run build` to create an optimized production build

_The files will be placed in `/dist`_

Execute `npm run preview` to view the website
