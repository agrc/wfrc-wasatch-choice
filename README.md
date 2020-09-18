# WFRC - Wasatch Choice Interactive Map [![Build Status](https://travis-ci.com/agrc/wfrc.svg?branch=master)](https://travis-ci.com/agrc/wfrc)

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

### `about-en.json` & `about-es.json`

These files contain the content that will show up in the about widget (left side panel). One of them (depending on the current language) is loaded separately from `config.json` due to it's large size. The property names of the root object correspond to the `mapInfos` keys in `config.json`.

```json
{
  "$schema": "http://json-schema.org/schema#",
  "type": "object",
  "properties": {
    "vision": {
      "description": "HTML content for the first (Vision) tab",
      "type": "string"
    },
    "transportation": {
      "description": "HTML content for the second (Transportation) tab",
      "type": "string"
    },
    "land-use": {
      "description": "HTML content for the third (Land Use) tab",
      "type": "string"
    },
    "economic-development": {
      "description": "HTML content for the fourth (Economic Development) tab",
      "type": "string"
    },
    "another-tab-id": {
      "description": "HTML content for the fifth (Amenities) tab",
      "type": "string"
    }
  }
}
```

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

Execute `npm start` to start a web server and view the website

Open [`src/App.js`](src/App.js) to view the development version of the app.

Build an awesome app.

Execute `npm test` to run tests

## Build

Execute `npm run build` to create an optimized production build

_The files will be placed in `/build`_

Execute `serve -s build` to view the website

## Deploy

One-time tasks:

- [ ] Update the analytics code in `public/index.html`
- [ ] Create and populate `secrets.json` based on `secrets.sample.json`

Tasks to be completed for each release:

- [ ] Verify all tests are passing (`npm run test:once`)
- [ ] `npm run release` or `npm run release -- --prerelease`
- [ ] Run a build and test (`npm run build` | `npm run build-stage`)
- [ ] Deploy website (`grunt deploy-prod` | `grunt deploy-stage`)
  - `-prod` builds a .zip file that can be manually attached to the release on GitHub for the client to download.
  - `-stage` pushes the app to [test.mapserv.utah.gov/wfrc](https://test.mapserv.utah.gov/wfrc/)
- [ ] Push commits and tag to github (`git push origin && git push origin --tags`)
