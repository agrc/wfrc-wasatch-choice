describe('tabs', () => {
  it('switching tabs preserves map extent', () => {
    cy.loadApp();

    cy.get('[title="Zoom in"]').then((button) => {
      button.trigger('click');
      button.trigger('click');
    });

    cy.getMapExtent().as('originalExtent');

    cy.findByLabelText('Centers & Land Uses Tab').click();

    cy.get('@originalExtent').then((originalExtent) => {
      cy.getMapExtent().should('equal', originalExtent);
    });
  });

  it('map layer visibility is preserved when switching back and forward between tabs', () => {
    cy.loadApp();

    let getVisibleLayers;
    cy.window().then((win) => {
      getVisibleLayers = win.getVisibleLayers;
    });

    cy.waitForMapLoaded();

    // turn off roads layers
    let originalVisibleLayers;
    cy.findByRole('checkbox', { name: /transportation/i }).click();

    cy.waitForMapLoaded().then(() => {
      originalVisibleLayers = getVisibleLayers();
      console.log('originalVisibleLayers', originalVisibleLayers);
    });

    cy.findByLabelText('Centers & Land Uses Tab').click();

    cy.waitForMapLoaded();

    cy.findByLabelText('Vision Tab').click();

    cy.waitForMapLoaded().then(() => {
      expect(getVisibleLayers()).to.eql(originalVisibleLayers);
    });
  });

  it('layer selector is hidden and shown appropriately', () => {
    cy.loadApp();

    cy.get('.esri-ui #layer-selector').should('not.exist');

    cy.findByLabelText('Transportation Tab').click();

    cy.get('.esri-ui #layer-selector').should('exist');

    cy.findByLabelText('Vision Tab').click();

    cy.get('.esri-ui #layer-selector').should('not.exist');
  });

  it('drag and drop to rearrange tabs', () => {
    cy.loadApp();

    cy.findByLabelText('Centers & Land Uses Tab').mouseMoveBy(-400, 0);
    cy.findByLabelText('Transportation Tab').mouseMoveBy(400, 0);

    cy.get(':nth-child(1) > .nav-item > .nav-link').should(
      'have.text',
      'Centers & Land Uses',
    );
    cy.get(':nth-child(5) > .nav-item > .nav-link').should(
      'have.text',
      'Transportation',
    );

    // assert that URL was updated
    cy.hash().should(
      'contain',
      'landuse.vision.econdev.recreation.transportation',
    );
  });
});
