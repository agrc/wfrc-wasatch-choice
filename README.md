# WFRC - Wasatch Choice Interactive Map [![Build Status](https://travis-ci.com/agrc/wfrc.svg?branch=master)](https://travis-ci.com/agrc/wfrc)

[mockups](https://docs.google.com/presentation/d/1m30EQch-gXr4IczSRmM9TthAMsiAgCITS3Qo9C-tZkU/edit#slide=id.g5750aa3557_0_0)

## Configuration

The app is configured via a few JSON files located at the root of the deployed project. In development they are located in `./public`.

### `config.json`
This is where all of the app configuration except the about widget is contained.

#### `sherlock`
This is for configuring the place name widget.

`serviceUrl`(required) - `[string]`  
The URL to the service that you would like to search features on.

`searchField`(required) - `[string]`  
The name of the field that you would like the search to be applied to.

`placeHolder` - `[string]`  
The place holder text that shows up in the text box before a user starts typing.

### `about.json`
This file contains the content that will show up in the about widget (left side panel). It is loaded separately due to it's large size.

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
