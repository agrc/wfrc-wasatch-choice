describe('filter', () => {
  it('reset button resets all of the controls', () => {
    cy.loadApp();

    cy.get('.filter .group-container input').first().click();
    cy.get('.filter .child-checkbox-container input').last().click();

    cy.findByText(/reset/i).first().click();

    cy.get('.filter .group-container input').check();
    cy.get('.filter .child-checkbox-container input').check();
  });
  it('turning off checkboxes reduces the number of layers', () => {
    cy.loadApp();

    let getVisibleLayers;
    let originalVisibleLayers;
    cy.window().then((win) => {
      getVisibleLayers = win.getVisibleLayers;

      originalVisibleLayers = getVisibleLayers();
    });

    cy.get('.filter .group-container input').first().click();

    cy.waitForMapLoaded().then(() => {
      expect(getVisibleLayers().length).below(originalVisibleLayers.length);
    });
  });
});
