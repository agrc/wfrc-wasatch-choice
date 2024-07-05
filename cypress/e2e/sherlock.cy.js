const SANDY_EXTENT =
  '{"spatialReference":{"wkid":3857},"xmin":-12463811.219037749,"ymin":4938715.567033521,"xmax":-12438204.81456225,"ymax":4960423.683066481}';

describe('sherlock', () => {
  it('search and select using keyboard', () => {
    cy.loadApp();

    cy.findByPlaceholderText(/Search/i).type('sandy');

    cy.findByRole('option', { name: /sandy/i });

    cy.findByPlaceholderText(/Search/i).type('{downarrow}');
    cy.findByPlaceholderText(/Search/i).type('{enter}');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.getMapExtent().should('equal', SANDY_EXTENT);
  });

  it('search and select match with mouse', () => {
    cy.loadApp();

    cy.findByPlaceholderText(/Search/i).type('san');

    cy.findByRole('option', { name: /sandy/i }).click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.getMapExtent().should('equal', SANDY_EXTENT);
  });
});
