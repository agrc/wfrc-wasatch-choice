describe('url params', () => {
  it('sideBarClosed closes sidebar', () => {
    cy.loadApp('/#sideBarClosed=true');

    cy.findByTestId('center-container').should('have.css', 'left', '0px');
  });

  it('selectedMap activates the correct tab', () => {
    cy.loadApp('/#selectedMap=land-use');

    cy.findByLabelText('Land Use Tab').get('.nav-link').should('have.class', 'active');

    cy.window().then((win) => {
      expect(win.currentMapName).to.equal('Land Use');
    });
  });

  it('scale, x, & y params set the map extent', () => {
    cy.loadApp('/#scale=72224&sideBarClosed=true&x=-12461939&y=4976704');

    cy.getMapExtent().should(
      'equal',
      '{"spatialReference":{"wkid":3857},"xmin":-12471493.628535634,"ymin":4971276.97099176,"xmax":-12452384.371464366,"ymax":4982131.02900824}'
    );
  });

  it('loads the correct tabs', () => {
    cy.loadApp('/#mapList=vision.recreation.economic-development.transportation.open-space');

    cy.get(':nth-child(1) > .nav-item > .nav-link').should('have.text', 'Vision');
    cy.get(':nth-child(2) > .nav-item > .nav-link').should('have.text', 'Recreation');
    cy.get(':nth-child(3) > .nav-item > .nav-link').should('have.text', 'Economic Development');
    cy.get(':nth-child(4) > .nav-item > .nav-link').should('have.text', 'Transportation');
    cy.get(':nth-child(5) > .nav-item > .nav-link').should('have.text', 'Open Space');
  });
});
