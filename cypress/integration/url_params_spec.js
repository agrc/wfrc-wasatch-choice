describe('url params', () => {
  it('sideBarClosed closes sidebar', () => {
    cy.loadApp('http://localhost:3000/#currentTab=vision&sideBarClosed=true');

    cy.findByTestId('center-container').should('have.css', 'left', '0px');
  });
  it('currentTabId activates the correct tab', () => {
    cy.loadApp('http://localhost:3000/#currentTabId=land-use');

    cy.findByLabelText('Land Use Tab').should('have.class', 'active');

    cy.window().then(win => {
      expect(win.currentMapName).to.equal('Land Use');
    });
  });
  it('scale, x, & y params set the map extent', () => {
    cy.loadApp('http://localhost:3000/#currentTab=land-use&currentTabId=vision&scale=72224&sideBarClosed=true&x=-12461939&y=4976704');

    cy.getMapExtent().then(extent => expect(extent).to.equal('{"spatialReference":{"wkid":3857},"xmin":-12471493.628535634,"ymin":4971276.97099176,"xmax":-12452384.371464366,"ymax":4982131.02900824}'));
  });
});
