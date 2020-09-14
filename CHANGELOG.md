# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0-7](https://github.com/agrc/wfrc/compare/v2.0.0-6...v2.0.0-7) (2020-09-14)


### Features

* implement reset for QueryFilter widget ([246d904](https://github.com/agrc/wfrc/commit/246d904d7d020277d0aa6743372c7ae4edd60d97)), closes [#65](https://github.com/agrc/wfrc/issues/65)
* rough implementation of QueryFilter widget ([ddb02a0](https://github.com/agrc/wfrc/commit/ddb02a06ed86e5dcd4382ff8e39f4eab6d5d02f8)), closes [#65](https://github.com/agrc/wfrc/issues/65)


### Bug Fixes

* create more separation between fields ([8a17cf4](https://github.com/agrc/wfrc/commit/8a17cf41691391041c4554f6a996b634d5782192))
* don't update parent state within state change of child ([7c678ab](https://github.com/agrc/wfrc/commit/7c678ab50f24ed685f8c310570e2101750073510))
* **build:** delete docs folder before generation ([de89f07](https://github.com/agrc/wfrc/commit/de89f07113bf2a7e73a30cec9956914c62ced947))
* switch to smaller header logo sooner ([4ee5cb1](https://github.com/agrc/wfrc/commit/4ee5cb159b21162b56a436ae7878fe8bda9609a2))

## [2.0.0-6](https://github.com/agrc/wfrc/compare/v2.0.0-5...v2.0.0-6) (2020-08-31)


### Bug Fixes

* fix sidebar layout regression bug ([c434323](https://github.com/agrc/wfrc/commit/c434323dfb0ac00d9327fa8e40d57ec13a910173))

## [2.0.0-5](https://github.com/agrc/wfrc/compare/v2.0.0-4...v2.0.0-5) (2020-08-31)


### Bug Fixes

* better lineheight for details title ([b53d5f2](https://github.com/agrc/wfrc/commit/b53d5f2303ca8a3e75a0f789e72a9e35b30750cc)), closes [#62](https://github.com/agrc/wfrc/issues/62)

## [2.0.0-4](https://github.com/agrc/wfrc/compare/v1.5.5...v2.0.0-4) (2020-08-21)


### ⚠ BREAKING CHANGES

* The `currentTabIndex` has been replaced with `currentTab`.
* The about.json file keys are now the tab ids rather than numeric indexes.
* The `tabs` config property has been renamed to `tabInfos`. The structure has also been changed from an array to an object.

### Features

* add a few url param tests ([d5f0b5c](https://github.com/agrc/wfrc/commit/d5f0b5c9073f08f6a3739d01d32908595c6efb5b))
* add linting script and step to travis ([aaf8623](https://github.com/agrc/wfrc/commit/aaf8623d0aefb57f900c83be0963bc1b0def40a9)), closes [#53](https://github.com/agrc/wfrc/issues/53)
* add npm start to cypress:open command ([e468ea2](https://github.com/agrc/wfrc/commit/e468ea24e3407910b06c24ed3ab811a8598e4d50))
* add support for n number of maps in the config ([fcca1a9](https://github.com/agrc/wfrc/commit/fcca1a94c6eb7dc7c74f023965fa7c3be25ba367)), closes [#43](https://github.com/agrc/wfrc/issues/43)
* add tab picker integration tests ([0e18cf6](https://github.com/agrc/wfrc/commit/0e18cf6361a46989fe4aa122ce74f1fe93b0276f))
* add url param tests for extent ([904a7ed](https://github.com/agrc/wfrc/commit/904a7edd817b2113d86323495004f07ff2cdb2f9))
* implement cypress and a simple test ([96823ef](https://github.com/agrc/wfrc/commit/96823ef2de2f8c0998cd06fef94bd819142dbdc1))
* implement TapPicker component ([31e3825](https://github.com/agrc/wfrc/commit/31e38251224426434364f22ae9dc2d0eeb1da228)), closes [#45](https://github.com/agrc/wfrc/issues/45)
* limit the number of tabs that can be selected ([810601a](https://github.com/agrc/wfrc/commit/810601ae0e2dd03ef0fc951dd8d2bb81cfaa317a))
* make tabs drag-and-droppable ([c152d69](https://github.com/agrc/wfrc/commit/c152d6904dc794d56e6d14f4324fc22d84bca78d)), closes [#59](https://github.com/agrc/wfrc/issues/59)
* manage current tab ids as state in tabs component ([e2d6d74](https://github.com/agrc/wfrc/commit/e2d6d745fb97ecb4d02c81d753fef95f655c3919))
* map changes to current tab ids to local storage ([33ecf33](https://github.com/agrc/wfrc/commit/33ecf33105f2b0c48d71d5f1337bd9e1fac971df)), closes [#44](https://github.com/agrc/wfrc/issues/44)
* move configSchema.json to public folder ([f705a2a](https://github.com/agrc/wfrc/commit/f705a2ab410046ea5ed488e8724af6bcd15349c8))


### Bug Fixes

* better passing of map view back to click handler ([5634f6d](https://github.com/agrc/wfrc/commit/5634f6d8ed1728db646edd178151ec503b52d33f)), closes [#57](https://github.com/agrc/wfrc/issues/57)
* cache bust config file requests on new version ([13c82a1](https://github.com/agrc/wfrc/commit/13c82a10abcac28ad9c394538cc1f67ddab972d6))
* change config.tabInfos -> config.mapInfos ([8738449](https://github.com/agrc/wfrc/commit/8738449267e66cedab4f7b81d7c626d27dae0d3a)), closes [#54](https://github.com/agrc/wfrc/issues/54)
* fix alignment issue with sherlock result ([f9e8b15](https://github.com/agrc/wfrc/commit/f9e8b1597b387f180e9bfbb6b58b01395e64d281))
* fix bug causing layer selector to be hidden ([7a137b9](https://github.com/agrc/wfrc/commit/7a137b9879a13c675cdfadeff75ecc3414d0b2c2))
* fix bug causing the project info click to fail ([3f32597](https://github.com/agrc/wfrc/commit/3f32597f0b9f3ceb74fae7229f7eb50126c28f16))
* fix bug preventing from current tab url from working ([6b63e2a](https://github.com/agrc/wfrc/commit/6b63e2adb5060c480bd86126d90ab87b30ae1ab1))
* fix bug preventing map extent from being preserved between tabs ([414389e](https://github.com/agrc/wfrc/commit/414389e66140fb0f6dcfa025c4cc9be31098e774))
* fix cypress tab tests to be true failures ([ff65b6a](https://github.com/agrc/wfrc/commit/ff65b6ac6533d260e51d4923e4eb65e3c0e445b1))
* hide sherlock match list by default ([deff9c3](https://github.com/agrc/wfrc/commit/deff9c36657450be14f16f424cbcf8c38ad16805))
* increase cypress default timeout ([05c7870](https://github.com/agrc/wfrc/commit/05c787005fdec2be5f34489ac3426f90a0e11994))
* linting and add explaination ([029265e](https://github.com/agrc/wfrc/commit/029265e14a0dbe8e1214c1f269d2d46504c99cb8))
* make mapView stateful to make sure related components update on changes ([f83acbd](https://github.com/agrc/wfrc/commit/f83acbd66d21d82102626bd8fefeb580a68d84e1))
* make test more reliable ([8f76e49](https://github.com/agrc/wfrc/commit/8f76e49f50ce97db93629702bb24c1ad1b3e82e4))
* make url param names consistent with configure tabs controls ([cda72af](https://github.com/agrc/wfrc/commit/cda72afd17505a66d376673c11894d027ca622fe)), closes [#54](https://github.com/agrc/wfrc/issues/54)
* more stable positioning of layer selector button between tabs ([766dc2c](https://github.com/agrc/wfrc/commit/766dc2ce03f746e27b153105e1d84baa70431315))
* move helpers to custom cypress commands ([58af97a](https://github.com/agrc/wfrc/commit/58af97ab1d9130aff0c407c2e8e713b95f722296))
* prevent update overflow on reset filter ([a9034b2](https://github.com/agrc/wfrc/commit/a9034b27bb56ded694c6571b261c310087dbccd6)), closes [#60](https://github.com/agrc/wfrc/issues/60)
* update config schema docs and fix typo ([f951528](https://github.com/agrc/wfrc/commit/f9515285689891e15da3d7993e23ef71893c7fdd))
* update storybook and fix storyshots tests ([c063f6d](https://github.com/agrc/wfrc/commit/c063f6d1f08aef7d99fc4bf3915ebed8e9fa629d))
* update tab config dialog title and labels ([0857517](https://github.com/agrc/wfrc/commit/0857517619ee11c3a04fadc051f61c0e15652cd4)), closes [#45](https://github.com/agrc/wfrc/issues/45)

## [2.0.0-3](https://github.com/agrc/wfrc/compare/v2.0.0-2...v2.0.0-3) (2020-08-03)


### Bug Fixes

* change config.tabInfos -> config.mapInfos ([97d58ac](https://github.com/agrc/wfrc/commit/97d58acb062ebdc0d6eb6802ca8f9e6c52d3d2c4)), closes [#54](https://github.com/agrc/wfrc/issues/54)
* fix alignment issue with sherlock result ([d04790f](https://github.com/agrc/wfrc/commit/d04790ff6f4b3c2676b474c43a5a4e566284ec63))
* increase cypress default timeout ([9c9879e](https://github.com/agrc/wfrc/commit/9c9879e84f54a2ae1a4d7d9a16e8524bc81e313c))
* update config schema docs and fix typo ([f28c9a3](https://github.com/agrc/wfrc/commit/f28c9a349f4527320386132dd6a9b3cae8292cc5))

## [2.0.0-2](https://github.com/agrc/wfrc/compare/v2.0.0-1...v2.0.0-2) (2020-07-29)


### Bug Fixes

* make url param names consistent with configure tabs controls ([87bc385](https://github.com/agrc/wfrc/commit/87bc385cfcfb957f38c80035f57a5fbc90e0c4d0)), closes [#54](https://github.com/agrc/wfrc/issues/54)
* update tab config dialog title and labels ([eda1aad](https://github.com/agrc/wfrc/commit/eda1aad25282fb10c6aa0ab09b3e81830114bd91)), closes [#45](https://github.com/agrc/wfrc/issues/45)

## [2.0.0-1](https://github.com/agrc/wfrc/compare/v2.0.0-0...v2.0.0-1) (2020-07-22)


### Bug Fixes

* cache bust config file requests on new version ([2fad070](https://github.com/agrc/wfrc/commit/2fad0702cdcc9855ea05149150f87eab6ef12730))

## [2.0.0-0](https://github.com/agrc/wfrc/compare/v1.5.5...v2.0.0-0) (2020-07-22)


### ⚠ BREAKING CHANGES

* The `currentTabIndex` has been replaced with `currentTab`.
* The about.json file keys are now the tab ids rather than numeric indexes.
* The `tabs` config property has been renamed to `tabInfos`. The structure has also been changed from an array to an object.

### Features

* add a few url param tests ([b8553b7](https://github.com/agrc/wfrc/commit/b8553b7836712d1cc85e4280792b6d7b0912d60a))
* add linting script and step to travis ([81b420d](https://github.com/agrc/wfrc/commit/81b420d84cbf71a470a43548cced2464a872f88c)), closes [#53](https://github.com/agrc/wfrc/issues/53)
* add npm start to cypress:open command ([57262a6](https://github.com/agrc/wfrc/commit/57262a68cdb031504388b8ef1cddb28dc56d9b44))
* add support for n number of maps in the config ([5a668d8](https://github.com/agrc/wfrc/commit/5a668d86d47ae624d59411e4233667a1926d47be)), closes [#43](https://github.com/agrc/wfrc/issues/43)
* add tab picker integration tests ([8c5a952](https://github.com/agrc/wfrc/commit/8c5a9523ac6a44739bbb2eee382026c9a3c18b74))
* add url param tests for extent ([e8be2df](https://github.com/agrc/wfrc/commit/e8be2dfdf44b453aa5cfec0f8fb89828d6a4bfc8))
* implement cypress and a simple test ([98abb19](https://github.com/agrc/wfrc/commit/98abb19190766bbfd1074a04c1a88519d9eae4b1))
* implement TapPicker component ([d6084f9](https://github.com/agrc/wfrc/commit/d6084f9d37c54f68a9bbe516b042295d45c1b46c)), closes [#45](https://github.com/agrc/wfrc/issues/45)
* limit the number of tabs that can be selected ([c4971f6](https://github.com/agrc/wfrc/commit/c4971f6ba6087f1ab3e4384ff402394cb480efeb))
* manage current tab ids as state in tabs component ([1c1a02a](https://github.com/agrc/wfrc/commit/1c1a02a4cc2f20e1ec56ff0f1e7a19ae087ee862))
* map changes to current tab ids to local storage ([e2a9fe6](https://github.com/agrc/wfrc/commit/e2a9fe630a96b935357672389182b1733b0315b7)), closes [#44](https://github.com/agrc/wfrc/issues/44)
* move configSchema.json to public folder ([e71de80](https://github.com/agrc/wfrc/commit/e71de80b318cd159f049d3fcd2ab72aa359710fb))


### Bug Fixes

* fix bug causing layer selector to be hidden ([3230049](https://github.com/agrc/wfrc/commit/3230049366378a39d61a0773f64386609050efbd))
* fix bug causing the project info click to fail ([6abad5a](https://github.com/agrc/wfrc/commit/6abad5aa60ecc8a55c5c8909bcb21666a988b62f))
* fix bug preventing from current tab url from working ([2522f6a](https://github.com/agrc/wfrc/commit/2522f6a68aacd96cbd778b4d16817d051f2d11e3))
* fix bug preventing map extent from being preserved between tabs ([4adef7b](https://github.com/agrc/wfrc/commit/4adef7b104d306516716647f78d54bcea6f7bd27))
* fix cypress tab tests to be true failures ([da4d549](https://github.com/agrc/wfrc/commit/da4d54919c870c7790cbd59031a19626012e1ea5))
* make mapView stateful to make sure related components update on changes ([b9421c4](https://github.com/agrc/wfrc/commit/b9421c48abdaaa91225dd3a664f3e923fc832812))
* make test more reliable ([d255d53](https://github.com/agrc/wfrc/commit/d255d5335b18208ac43f2b0e96ebccdef717a415))
* more stable positioning of layer selector button between tabs ([57be50c](https://github.com/agrc/wfrc/commit/57be50c3b34f7e4ee21bd5acafdfe3d2961ada27))
* move helpers to custom cypress commands ([e9fa618](https://github.com/agrc/wfrc/commit/e9fa61865cfda5a8dcb2476cef578d131de84d46))
* update storybook and fix storyshots tests ([d20b3cc](https://github.com/agrc/wfrc/commit/d20b3cc98baf9ffa1ec497efe9cfba000973983b))

### [1.5.5](https://github.com/agrc/wfrc/compare/v1.5.4...v1.5.5) (2019-12-06)


### Bug Fixes

* fix bug causing the layer selector to be hidden when it shouldn't have been ([a0dc79c](https://github.com/agrc/wfrc/commit/a0dc79c))

### [1.5.4](https://github.com/agrc/wfrc/compare/v1.5.3...v1.5.4) (2019-11-29)


### Bug Fixes

* fix bug causing cached filter state to become the default state between tabs ([cabd386](https://github.com/agrc/wfrc/commit/cabd386))

### [1.5.3](https://github.com/agrc/wfrc/compare/v1.5.2...v1.5.3) (2019-11-26)


### Bug Fixes

* **ProjectInfo:** fix bug causing duplicate features to be returned on map click ([0a21d2f](https://github.com/agrc/wfrc/commit/0a21d2f))

### [1.5.2](https://github.com/agrc/wfrc/compare/v1.5.1...v1.5.2) (2019-11-14)


### Bug Fixes

* bump map click tolerance to make it easier to click on features ([1777c61](https://github.com/agrc/wfrc/commit/1777c61))

### [1.5.1](https://github.com/agrc/wfrc/compare/v1.5.0...v1.5.1) (2019-11-14)


### Bug Fixes

* **ProjectInfo:** Fix bug preventing all features from displaying ([05d90de](https://github.com/agrc/wfrc/commit/05d90de))

## [1.5.0](https://github.com/agrc/wfrc/compare/v1.5.0-0...v1.5.0) (2019-10-25)

## [1.5.0-0](https://github.com/agrc/wfrc/compare/v1.4.0...v1.5.0-0) (2019-10-25)


### Bug Fixes

* **ProjectInfo:** clear selection when switching between tabs ([d937e3b](https://github.com/agrc/wfrc/commit/d937e3b))
* layout tweaks to tag line ([6717211](https://github.com/agrc/wfrc/commit/6717211))
* upgrade esri js to 4.13 and remove bump extent hack ([e947998](https://github.com/agrc/wfrc/commit/e947998))


### Features

* **ProjectInfo:** add support for map image layers ([ca9d476](https://github.com/agrc/wfrc/commit/ca9d476)), closes [#35](https://github.com/agrc/wfrc/issues/35)
* **ProjectInfo:** show loader for longer load times ([bdf906f](https://github.com/agrc/wfrc/commit/bdf906f))
* add config values for map widget default to open on load ([0dc0793](https://github.com/agrc/wfrc/commit/0dc0793)), closes [#39](https://github.com/agrc/wfrc/issues/39)

## [1.4.0](https://github.com/agrc/wfrc/compare/v1.4.0-3...v1.4.0) (2019-10-24)


### Bug Fixes

* fix bug causing duplicate radio group names ([3b3e77b](https://github.com/agrc/wfrc/commit/3b3e77b))
* fix tab layout issue with sidebar ([887ecce](https://github.com/agrc/wfrc/commit/887ecce))
* hide tag line on smaller screens to prevent layout issues ([7e7ec18](https://github.com/agrc/wfrc/commit/7e7ec18)), closes [#2](https://github.com/agrc/wfrc/issues/2)
* remove test code for defaulting project information widget to open ([b85bdae](https://github.com/agrc/wfrc/commit/b85bdae))
* shrink map widget width from 400px -> 330px ([d4ae8be](https://github.com/agrc/wfrc/commit/d4ae8be)), closes [#31](https://github.com/agrc/wfrc/issues/31) [#36](https://github.com/agrc/wfrc/issues/36)
* update snapshots ([12509d1](https://github.com/agrc/wfrc/commit/12509d1))


### Features

* add margin and italics to tag line ([d21aa4e](https://github.com/agrc/wfrc/commit/d21aa4e)), closes [#25](https://github.com/agrc/wfrc/issues/25)
* split projections and workplace accessibility into separate groups ([fba5393](https://github.com/agrc/wfrc/commit/fba5393)), closes [#31](https://github.com/agrc/wfrc/issues/31)

## [1.4.0-3](https://github.com/agrc/wfrc/compare/v1.4.0-2...v1.4.0-3) (2019-10-22)


### Bug Fixes

* clean up unused config and add missing schema definitions ([1b888dc](https://github.com/agrc/wfrc/commit/1b888dc))
* standardize project info & filter widget widths ([da3e754](https://github.com/agrc/wfrc/commit/da3e754)), closes [#36](https://github.com/agrc/wfrc/issues/36)
* update snapshot tests ([f89b3f8](https://github.com/agrc/wfrc/commit/f89b3f8))
* workaround for config schema generation tool bug ([e42799c](https://github.com/agrc/wfrc/commit/e42799c))


### Features

* add close button to the top of the sidebar for very small devices ([6760758](https://github.com/agrc/wfrc/commit/6760758)), closes [#37](https://github.com/agrc/wfrc/issues/37)
* **ProjectInformation:** highlight selected graphics on hover ([748e4b9](https://github.com/agrc/wfrc/commit/748e4b9))
* **ProjectInformation:** use AGOL popup content ([ffc7ce8](https://github.com/agrc/wfrc/commit/ffc7ce8)), closes [#34](https://github.com/agrc/wfrc/issues/34)
* add configurable tab line element ([22cbfc5](https://github.com/agrc/wfrc/commit/22cbfc5)), closes [#25](https://github.com/agrc/wfrc/issues/25)
* add the ability to define static colors with a symbol image file ([0ee9b5b](https://github.com/agrc/wfrc/commit/0ee9b5b)), closes [#32](https://github.com/agrc/wfrc/issues/32)

## [1.4.0-2](https://github.com/agrc/wfrc/compare/v1.4.0-1...v1.4.0-2) (2019-10-16)


### Bug Fixes

* better resolution for smaller logo image ([ae59d77](https://github.com/agrc/wfrc/commit/ae59d77)), closes [#30](https://github.com/agrc/wfrc/issues/30)
* clean up layout, remove gutters ([bc6d81c](https://github.com/agrc/wfrc/commit/bc6d81c))

## [1.4.0-1](https://github.com/agrc/wfrc/compare/v1.4.0-0...v1.4.0-1) (2019-10-16)


### Bug Fixes

* update snapshot test ([c0f99fa](https://github.com/agrc/wfrc/commit/c0f99fa))


### Features

* add static symbol option to allow for static image in legend popup ([ec2a6c3](https://github.com/agrc/wfrc/commit/ec2a6c3)), closes [#32](https://github.com/agrc/wfrc/issues/32)

## [1.4.0-0](https://github.com/agrc/wfrc/compare/v1.3.0...v1.4.0-0) (2019-10-16)


### Bug Fixes

* hide project info widget for tabs where agol popups are enabled ([ed382c8](https://github.com/agrc/wfrc/commit/ed382c8))
* make class symbol colors match the symbology of the layer ([d5b8371](https://github.com/agrc/wfrc/commit/d5b8371))
* move mobile landing page link to smaller icon rather than tab link ([e0758c7](https://github.com/agrc/wfrc/commit/e0758c7)), closes [#30](https://github.com/agrc/wfrc/issues/30)


### Features

* add "Green Space" layers to "Land Use" & "Recreation" tabs ([8f5b303](https://github.com/agrc/wfrc/commit/8f5b303)), closes [#28](https://github.com/agrc/wfrc/issues/28)
* add auto-generated markdown doc for config.json schema ([b188628](https://github.com/agrc/wfrc/commit/b188628))
* add link back to landing page ([3f83aaf](https://github.com/agrc/wfrc/commit/3f83aaf)), closes [#30](https://github.com/agrc/wfrc/issues/30)
* add the ability to add popover labels to dynamic symbols ([1d449ca](https://github.com/agrc/wfrc/commit/1d449ca)), closes [#29](https://github.com/agrc/wfrc/issues/29)

## [1.3.0](https://github.com/agrc/wfrc/compare/v1.3.0-0...v1.3.0) (2019-10-08)

## [1.3.0-0](https://github.com/agrc/wfrc/compare/v1.2.1-1...v1.3.0-0) (2019-10-07)


### Bug Fixes

* fix bug causing land ownership filter controls to be linked between tabs ([38ed051](https://github.com/agrc/wfrc/commit/38ed051)), closes [#23](https://github.com/agrc/wfrc/issues/23)
* hide logo before it overlaps the tabs ([ab4c004](https://github.com/agrc/wfrc/commit/ab4c004)), closes [#20](https://github.com/agrc/wfrc/issues/20)


### Features

* finish porting ProjectInfo widget for feature layers only ([9883a5e](https://github.com/agrc/wfrc/commit/9883a5e)), closes [#8](https://github.com/agrc/wfrc/issues/8)

### [1.2.1-1](https://github.com/agrc/wfrc/compare/v1.2.1-0...v1.2.1-1) (2019-10-07)


### Bug Fixes

* filter/project info widget layout improvements for smaller devices ([ebfa135](https://github.com/agrc/wfrc/commit/ebfa135)), closes [#20](https://github.com/agrc/wfrc/issues/20)
* make tabs scroll horizontally on smaller screens ([b421f23](https://github.com/agrc/wfrc/commit/b421f23)), closes [#20](https://github.com/agrc/wfrc/issues/20)
* remove default to open for filter ([1e64411](https://github.com/agrc/wfrc/commit/1e64411))

### [1.2.1-0](https://github.com/agrc/wfrc/compare/v1.2.0...v1.2.1-0) (2019-10-04)


### Bug Fixes

* update snapshot tests ([622f862](https://github.com/agrc/wfrc/commit/622f862))

## [1.2.0](https://github.com/agrc/wfrc/compare/v1.1.0...v1.2.0) (2019-09-11)


### Features

* enable support for class breaks renderers for classes symbols ([a1a0e1d](https://github.com/agrc/wfrc/commit/a1a0e1d))

## [1.1.0](https://github.com/agrc/wfrc/compare/v1.0.1...v1.1.0) (2019-09-11)


### Bug Fixes

* fix bug preventing default popups from working ([1bcf289](https://github.com/agrc/wfrc/commit/1bcf289))
* slightly better handling of layer lookups between tab switching ([b6a97bd](https://github.com/agrc/wfrc/commit/b6a97bd))


### Features

* add "defaultExtent" config property ([a081282](https://github.com/agrc/wfrc/commit/a081282))

### [1.0.1](https://github.com/agrc/wfrc/compare/v1.0.0...v1.0.1) (2019-09-10)


### Bug Fixes

* bump extent on tabs with map image layers to force refresh ([775defe](https://github.com/agrc/wfrc/commit/775defe)), closes [#27](https://github.com/agrc/wfrc/issues/27)
* support different popup settings for tabs ([492f42d](https://github.com/agrc/wfrc/commit/492f42d))

## [1.0.0](https://github.com/agrc/wfrc/compare/v0.6.4...v1.0.0) (2019-09-10)


### Bug Fixes

* better loading of esri js api ([23893c7](https://github.com/agrc/wfrc/commit/23893c7))
* remove default open ([cf0b7ba](https://github.com/agrc/wfrc/commit/cf0b7ba))


### Features

* Eco Dev Tab: reorder layers and add "TOD Sites" layer ([7c16a7d](https://github.com/agrc/wfrc/commit/7c16a7d))
* radio button group parent checkboxes now default to off ([6ebaab3](https://github.com/agrc/wfrc/commit/6ebaab3))

### [0.6.4](https://github.com/agrc/wfrc/compare/v0.6.3...v0.6.4) (2019-09-10)

### [0.6.3](https://github.com/agrc/wfrc/compare/v0.6.1...v0.6.3) (2019-09-09)

### Bug Fixes

* change title font to Montserrat (Google Fonts) ([d6f984e](https://github.com/agrc/wfrc/commit/d6f984e)), closes [#22](https://github.com/agrc/wfrc/issues/22)
* fix bug preventing some sublayers from being found ([08a9acb](https://github.com/agrc/wfrc/commit/08a9acb))
* handle bug caused by switching to async getLayers ([744ce20](https://github.com/agrc/wfrc/commit/744ce20)), closes [#10](https://github.com/agrc/wfrc/issues/10)
* move app version to About widget ([9684919](https://github.com/agrc/wfrc/commit/9684919)), closes [#24](https://github.com/agrc/wfrc/issues/24)
* revert default to open on filter ([d45eadf](https://github.com/agrc/wfrc/commit/d45eadf))
* standardize map controls ([f20ac70](https://github.com/agrc/wfrc/commit/f20ac70)), closes [#15](https://github.com/agrc/wfrc/issues/15)


### Features

* **Filter:** implement reset button ([5a105ab](https://github.com/agrc/wfrc/commit/5a105ab)), closes [#10](https://github.com/agrc/wfrc/issues/10)
* **ProjectInfo:** flesh out ProjectInformation and Details components ([6b2063d](https://github.com/agrc/wfrc/commit/6b2063d)), closes [#8](https://github.com/agrc/wfrc/issues/8)
* add home button ([7c31027](https://github.com/agrc/wfrc/commit/7c31027)), closes [#16](https://github.com/agrc/wfrc/issues/16)
* add tab config for toggling default AGOL popups ([83d0295](https://github.com/agrc/wfrc/commit/83d0295))

### [0.6.1](https://github.com/agrc/wfrc/compare/v0.6.0...v0.6.1) (2019-08-19)


### Bug Fixes

* **Filter:** don't get symbol until layer is fully loaded ([f44b0ea](https://github.com/agrc/wfrc/commit/f44b0ea))

## [0.6.0](https://github.com/agrc/wfrc/compare/v0.5.0...v0.6.0) (2019-08-19)


### Bug Fixes

* **Filter:** make legend swatches match map layer opacity ([4b6653a](https://github.com/agrc/wfrc/commit/4b6653a)), closes [#10](https://github.com/agrc/wfrc/issues/10)
* header style updates ([b516082](https://github.com/agrc/wfrc/commit/b516082)), closes [#19](https://github.com/agrc/wfrc/issues/19)
* only validate checkbox layers if the property exists ([3dbcb6e](https://github.com/agrc/wfrc/commit/3dbcb6e))


### Features

* **Filter:** add "?" and popover to polygon classes legends ([531d28a](https://github.com/agrc/wfrc/commit/531d28a)), closes [#10](https://github.com/agrc/wfrc/issues/10)
* **Filter:** add `polygonClasses` symbol ([986ee37](https://github.com/agrc/wfrc/commit/986ee37)), closes [#10](https://github.com/agrc/wfrc/issues/10)
* **Filter:** existing bike/ped & transit symbols ([decb9b8](https://github.com/agrc/wfrc/commit/decb9b8)), closes [#10](https://github.com/agrc/wfrc/issues/10)
* **Filter:** implement "filter by phasing" checkbox ([1d202c0](https://github.com/agrc/wfrc/commit/1d202c0))
* **Filter:** implement linePoint symbol ([c42ea73](https://github.com/agrc/wfrc/commit/c42ea73)), closes [#10](https://github.com/agrc/wfrc/issues/10)
* **Filter:** implement phase symbols ([a516571](https://github.com/agrc/wfrc/commit/a516571)), closes [#10](https://github.com/agrc/wfrc/issues/10)
* **Filter:** implement simple symbol type ([b4fe882](https://github.com/agrc/wfrc/commit/b4fe882)), closes [#10](https://github.com/agrc/wfrc/issues/10)
* **Filter:** validate checkbox layer names and print error if one is bad ([219d85c](https://github.com/agrc/wfrc/commit/219d85c)), closes [#10](https://github.com/agrc/wfrc/issues/10)

## [0.5.0](https://github.com/agrc/wfrc/compare/v0.4.0...v0.5.0) (2019-08-13)


### Bug Fixes

* allow for scrolling within the mapwidget panes ([bd0c2b3](https://github.com/agrc/wfrc/commit/bd0c2b3))
* better spacing for version number ([53acecb](https://github.com/agrc/wfrc/commit/53acecb))
* move layer-selector to the top-left of map ([9b9acbf](https://github.com/agrc/wfrc/commit/9b9acbf))
* remove Imagery_BW base map from layer-selector ([b696a16](https://github.com/agrc/wfrc/commit/b696a16))


### Features

* implement radio button option for Land Uses tab ([aed245e](https://github.com/agrc/wfrc/commit/aed245e)), closes [#10](https://github.com/agrc/wfrc/issues/10)
* implement storybook & storyshots ([48a869f](https://github.com/agrc/wfrc/commit/48a869f))
* Implement the beginnings of the filter widget ([c111342](https://github.com/agrc/wfrc/commit/c111342)), closes [#14](https://github.com/agrc/wfrc/issues/14) [#10](https://github.com/agrc/wfrc/issues/10)
* wire up layer visibility toggling ([72ff2be](https://github.com/agrc/wfrc/commit/72ff2be)), closes [#10](https://github.com/agrc/wfrc/issues/10)
* wire up phase checkboxes ([0947c2b](https://github.com/agrc/wfrc/commit/0947c2b)), closes [#10](https://github.com/agrc/wfrc/issues/10)

## [0.4.0](https://github.com/agrc/wfrc/compare/v0.3.0...v0.4.0) (2019-08-08)


### Bug Fixes

* fix production deploy path ([149c79e](https://github.com/agrc/wfrc/commit/149c79e))
* make layer-selector state consistent between maps ([4b367b2](https://github.com/agrc/wfrc/commit/4b367b2))
* update discover quad word for wfrc prod server ([a9b50cb](https://github.com/agrc/wfrc/commit/a9b50cb))
* update tab names and web map ids ([f05c7b3](https://github.com/agrc/wfrc/commit/f05c7b3))


### Features

* add tab config for base map selector visibility ([6cea413](https://github.com/agrc/wfrc/commit/6cea413)), closes [#14](https://github.com/agrc/wfrc/issues/14)
* allow for different about content values per tab ([a4a917e](https://github.com/agrc/wfrc/commit/a4a917e)), closes [#14](https://github.com/agrc/wfrc/issues/14)
* implement layerSelector configs & config validation ([13931a2](https://github.com/agrc/wfrc/commit/13931a2))

## [0.3.0](https://github.com/agrc/wfrc/compare/v0.2.0...v0.3.0) (2019-08-06)


### Features

* add currentTabIndex url param ([251ef8f](https://github.com/agrc/wfrc/commit/251ef8f)), closes [#9](https://github.com/agrc/wfrc/issues/9)
* add url param for sidebar open state ([2f75487](https://github.com/agrc/wfrc/commit/2f75487)), closes [#9](https://github.com/agrc/wfrc/issues/9)
* add x/y/scale URL parameters ([1171174](https://github.com/agrc/wfrc/commit/1171174)), closes [#9](https://github.com/agrc/wfrc/issues/9)

## [0.2.0](https://github.com/agrc/wfrc/compare/v0.1.3...v0.2.0) (2019-08-05)


### Features

* add google analytics code for production ([15b9470](https://github.com/agrc/wfrc/commit/15b9470)), closes [#12](https://github.com/agrc/wfrc/issues/12)
* implement sherlock widget and config ([4616b32](https://github.com/agrc/wfrc/commit/4616b32)), closes [#13](https://github.com/agrc/wfrc/issues/13)

### [0.1.3](https://github.com/agrc/wfrc/compare/v0.1.2...v0.1.3) (2019-08-01)


### Bug Fixes

* fix bug causing incorrect version number to be displayed ([615dd0a](https://github.com/agrc/wfrc/commit/615dd0a))


### Features

* add layout framework for panel widgets ([b94cfc6](https://github.com/agrc/wfrc/commit/b94cfc6)), closes [#3](https://github.com/agrc/wfrc/issues/3)

### [0.1.2](https://github.com/agrc/wfrc/compare/v0.1.1...v0.1.2) (2019-08-01)


### Features

* add about widget image popups ([ed557a0](https://github.com/agrc/wfrc/commit/ed557a0)), closes [#4](https://github.com/agrc/wfrc/issues/4)
* implement configurable about widget ([0e7b044](https://github.com/agrc/wfrc/commit/0e7b044)), closes [#4](https://github.com/agrc/wfrc/issues/4)

### [0.1.1](https://github.com/agrc/wfrc/compare/v0.1.0...v0.1.1) (2019-07-30)


### Bug Fixes

* update default extent to be the wasatch front ([7372e15](https://github.com/agrc/wfrc/commit/7372e15)), closes [#11](https://github.com/agrc/wfrc/issues/11)


### Features

* clicking on tabs shows the associated web map ([2ccba0e](https://github.com/agrc/wfrc/commit/2ccba0e)), closes [#6](https://github.com/agrc/wfrc/issues/6)
* implement config.json for app/widgets ([2481ebe](https://github.com/agrc/wfrc/commit/2481ebe)), closes [#5](https://github.com/agrc/wfrc/issues/5)

## 0.1.0 (2019-07-30)


### Bug Fixes

* fix discover vector basemap urls ([2ce51ce](https://github.com/agrc/wfrc/commit/2ce51ce))
* fix sherlock input dom attribute warning ([94c6c87](https://github.com/agrc/wfrc/commit/94c6c87))
* update header with WFRC-specific title and logo ([7992684](https://github.com/agrc/wfrc/commit/7992684)), closes [#2](https://github.com/agrc/wfrc/issues/2)


### Features

* implement tabs ([44692d9](https://github.com/agrc/wfrc/commit/44692d9)), closes [#2](https://github.com/agrc/wfrc/issues/2)
