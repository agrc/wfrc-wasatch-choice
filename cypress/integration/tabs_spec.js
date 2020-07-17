describe('tabs', () => {
  it('switching tabs preserves map extent', () => {
    cy.loadApp();

    const zoomInButton = cy.findByRole('button', { name: /zoom in/i });
    zoomInButton.click({ force: true });
    zoomInButton.click({ force: true });

    cy.waitForMapLoaded();

    let getExtent;
    let originalExtent;
    cy.window()
      .then((win) => {
        getExtent = win.getMapExtent;
      })
      .then(() => {
        console.log('getting originalExtent...');
        originalExtent = getExtent();
      });

    cy.findByLabelText('Land Use Tab').click();

    cy.waitForMapLoaded().then(() => {
      expect(getExtent()).to.equal(originalExtent);
    });
  });
  it('map layer visibility is preserved when switching back and forward between tabs', () => {
    cy.loadApp();

    let getVisibleLayers;
    cy.window().then(win => {
      getVisibleLayers = win.getVisibleLayers;
    });

    cy.waitForMapLoaded();

    // turn off roads layers
    let originalVisibleLayers;
    cy.findByRole('checkbox', { name: /transportation/i }).click({ force: true });

    cy.waitForMapLoaded().then(() => {
      originalVisibleLayers = getVisibleLayers();
      console.log('originalVisibleLayers', originalVisibleLayers);
    });

    cy.findByLabelText('Land Use Tab').click();

    cy.waitForMapLoaded();

    cy.findByLabelText('Vision Tab').click();

    cy.waitForMapLoaded().then(() => {
      expect(getVisibleLayers()).to.eql(originalVisibleLayers);
    });
  });
});
