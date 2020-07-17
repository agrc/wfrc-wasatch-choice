describe('url params', () => {
  it('sideBarClosed closes sidebar', () => {
    cy.loadApp('http://localhost:3000/#currentTab=vision&sideBarClosed=true');

    cy.findByTestId('center-container').should('have.css', 'left', '0px');
  });
  it('currentTab activates the correct tab', () => {
    cy.loadApp('http://localhost:3000/#currentTabId=land-use');

    cy.findByLabelText('Land Use Tab').should('have.class', 'active');

    cy.window().then(win => {
      expect(win.currentMapName).to.equal('Land Use');
    });
  });
});
