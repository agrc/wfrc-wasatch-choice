const waitForMapLoaded = () => {
  return cy.window().should('have.property', 'mapLoaded', true);
};
const loadApp = () => {
  cy.server();

  cy.visit('http://localhost:3000/');

  waitForMapLoaded();
};

describe('tabs', () => {
  it('switching tabs preserves map extent', () => {
    loadApp();

    const zoomInButton = cy.findByRole('button', { name: /zoom in/i });
    zoomInButton.click({ force: true });
    zoomInButton.click({ force: true });

    let getExtent;
    let originalExtent;
    cy.window()
      .then((win) => {
        getExtent = win.getMapExtent;
      })
      .then(() => {
        originalExtent = getExtent();
      });

    cy.findByLabelText('Land Use Tab').click();

    waitForMapLoaded().then(() => {
      expect(getExtent()).to.equal(originalExtent);
    });
  });
  it('map layer visibility is preserved when switching back and forward between tabs', () => {
    loadApp();

    let getVisibleLayers;
    cy.window().then(win => {
      getVisibleLayers = win.getVisibleLayers;
    });

    waitForMapLoaded();

    // turn off roads layers
    let originalVisibleLayers;
    cy.findByRole('checkbox', { name: /transportation/i }).click({ force: true }).then(() => {
      originalVisibleLayers = getVisibleLayers();
      console.log('originalVisibleLayers', originalVisibleLayers);
    });

    cy.findByLabelText('Land Use Tab').click();

    waitForMapLoaded();

    cy.findByLabelText('Vision Tab').click();

    waitForMapLoaded().then(() => {
      expect(getVisibleLayers()).to.equal(originalVisibleLayers);
    });
  });
});
