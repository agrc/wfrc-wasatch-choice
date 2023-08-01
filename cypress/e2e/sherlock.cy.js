const SANDY_EXTENT =
  '{"spatialReference":{"wkid":3857},"xmin":-12482606.404475499,"ymin":4955291.883967039,"xmax":-12431393.595524501,"ymax":4998708.116032961}';

describe('sherlock', () => {
  it('search and select using keyboard', () => {
    cy.loadApp();

    cy.findByPlaceholderText(/Search/i).type('sandy');

    cy.findByRole('option', { name: /sandy/i });

    cy.findByPlaceholderText(/Search/i).type('{downarrow}');
    cy.findByPlaceholderText(/Search/i).type('{enter}');

    cy.getMapExtent().should('equal', SANDY_EXTENT);
  });

  it('search and select match with mouse', () => {
    cy.loadApp();

    cy.findByPlaceholderText(/Search/i).type('san');

    cy.findByRole('option', { name: /sandy/i }).click();

    cy.getMapExtent().should('equal', SANDY_EXTENT);
  });
});
