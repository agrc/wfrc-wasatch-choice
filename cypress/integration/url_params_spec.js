describe('url params', () => {
  it('sideBarClosed closes sidebar', () => {
    cy.loadApp('/#sideBarClosed=true');

    cy.findByTestId('center-container').should('have.css', 'left', '0px');
  });
  it('selectedMap activates the correct tab', () => {
    cy.loadApp('/#selectedMap=land-use');

    cy.findByLabelText('Land Use Tab').should('have.class', 'active');

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
});
