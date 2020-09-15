describe('tabs', () => {
  it('switching tabs preserves map extent', () => {
    cy.loadApp();

    const zoomInButton = cy.findByRole('button', { name: /zoom in/i });
    zoomInButton.click();
    zoomInButton.click();

    cy.getMapExtent().as('originalExtent');

    cy.findByLabelText('Land Use Tab').click();

    cy.get('@originalExtent').then(originalExtent => {
      cy.getMapExtent().should('equal', originalExtent);
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
    cy.findByRole('checkbox', { name: /transportation/i }).click();

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
  it('layer selector is hidden and shown appropriately', () => {
    cy.loadApp();

    cy.findByRole('button', { name: /layers/i }).should('not.exist');

    cy.findByLabelText('Transportation Tab').click();

    cy.findByRole('button', { name: /layers/i }).should('exist');

    cy.findByLabelText('Vision Tab').click();

    cy.findByRole('button', { name: /layers/i }).should('not.exist');
  });
  it('drag and drop to rearrange tabs', () => {
    cy.loadApp();

    cy.findByLabelText('Transportation Tab')
      .trigger('mouseover')
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', 0, 0, { force: true })
    ;
    cy.findByLabelText('Recreation Tab')
      .trigger('mouseover')
      .trigger('mousemove', 0, 0, { force: true })
      .trigger('mouseup')
    ;

    // assert that tab nodes actually moved
    cy.get(':nth-child(4) > .nav-link').should('have.text', 'Recreation');
    cy.get(':nth-child(5) > .nav-link').should('have.text', 'Transportation');

    // assert that URL was updated
    cy.hash().should('contain', 'mapList=vision.land-use.economic-development.recreation.transportation');
  });
});
