describe('map-widget', () => {
  it('button toggles pane visibility', () => {
    cy.loadApp();

    cy.findByText(/filter/i).should('be.visible');

    cy.get('[title="Filter"] > .svg-inline--fa').click();

    cy.findByText(/filter/i).should('not.be.visible');

    cy.get('[title="Filter"] > .svg-inline--fa').click();

    cy.findByText(/filter/i).should('be.visible');
  });

  it('close button closes pane', () => {
    cy.loadApp();

    cy.findByText(/filter/i).should('be.visible');

    cy.get('.map-widget-card > .card-header > .buttons-container > .btn-close').click({ multiple: true });

    cy.findByText(/filter/i).should('not.be.visible');
    cy.findByText(/project information/i).should('not.be.visible');
  });
});
