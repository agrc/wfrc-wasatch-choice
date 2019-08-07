# WFRC - Wasatch Choice Interactive Map [![Build Status](https://travis-ci.com/agrc/wfrc.svg?branch=master)](https://travis-ci.com/agrc/wfrc)

[mockups](https://docs.google.com/presentation/d/1m30EQch-gXr4IczSRmM9TthAMsiAgCITS3Qo9C-tZkU/edit#slide=id.g5750aa3557_0_0)  
[tab configurations](https://docs.google.com/presentation/d/1m30EQch-gXr4IczSRmM9TthAMsiAgCITS3Qo9C-tZkU/edit#slide=id.g5e23978382_4_165)  

## Configuration

The app is configured via a few JSON files located at the root of the deployed project. In development they are located in `./public`.

### `config.json`
This is where all of the app configuration except the about widget is contained.
```json
{
  "$schema": "http://json-schema.org/schema#",
  "type": "object",
  "properties": {
    "tabs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "description": "The name of the tab that shows up in the actual tab control",
            "type": "string"
          },
          "webMapId": {
            "description": "The id of the web map that you would like displayed in the tab",
            "type": "string"
          },
          "hideLayerSelector": {
            "description": "Determines whether the layer selector widget is displayed or not",
            "type": "boolean",
            "default": false
          }
        },
        "required": ["name", "webMapId"]
      }
    },
    "sherlock": {
      "description": "Configuration options for the map search widget",
      "type": "object",
      "properties": {
        "serviceUrl": {
          "description": "The URL to the service that you would like to search features on.",
          "type": "string"
        },
        "searchField": {
          "description": "The name of the field that you would like the search to be applied to.",
          "type": "string"
        },
        "placeHolder": {
          "description": "The place holder text that shows up in the text box before a user starts typing.",
          "type": "string"
      },
      "required": ["serviceUrl", "searchField"]
    }
  }
}
```

### `about.json`
This file contains the content that will show up in the about widget (left side panel). It is loaded separately due to it's large size.
```json
{
  "$schema": "http://json-schema.org/schema#",
  "type": "object",
  "properties": {
    "0": {
      "description": "HTML content for the first (Vision) tab",
      "type": "string"
    },
    "1": {
      "description": "HTML content for the second (Transportation) tab",
      "type": "string"
    },
    "2": {
      "description": "HTML content for the third (Land Use) tab",
      "type": "string"
    },
    "3": {
      "description": "HTML content for the fourth (Economic Development) tab",
      "type": "string"
    },
    "4": {
      "description": "HTML content for the fifth (Amenities) tab",
      "type": "string"
    }
  }
}
```

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

- [ ] Verify all tests are passing (`npm test`)
- [ ] `npm run release` or `npm run release -- --prerelease`
- [ ] Run a build and test (`npm run build` | `npm run build-stage`)
- [ ] Deploy website (`grunt deploy-prod` | `grunt deploy-stage`)
- [ ] Push commits and tag to github (`git push origin && git push origin --tags`)
