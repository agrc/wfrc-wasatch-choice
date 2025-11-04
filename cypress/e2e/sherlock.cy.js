const MANTI_EXTENT =
  '{"spatialReference":{"wkid":3857},"xmin":-12433339.455879925,"ymin":4754201.408316715,"xmax":-12420536.253642173,"ymax":4765055.466333196}';

describe('sherlock', () => {
  it('search and select using keyboard', () => {
    cy.loadApp();

    cy.findByPlaceholderText(/Search/i).type('manti');

    cy.findAllByRole('option', { name: /manti/i }).should('exist');

    cy.findByPlaceholderText(/Search/i).type('{downarrow}');
    cy.findByPlaceholderText(/Search/i).type('{enter}');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.getMapExtent(MANTI_EXTENT);
  });

  it('search and select match with mouse', () => {
    cy.loadApp();

    cy.findByPlaceholderText(/Search/i).type('manti');

    cy.findByRole('option', { name: /manti/i }).click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.getMapExtent(MANTI_EXTENT);
  });
});
