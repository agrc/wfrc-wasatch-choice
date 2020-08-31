describe('sidebar-toggle', () => {
  it('toggles the visibility of the side bar', () => {
    cy.loadApp();

    cy.get('.about__version').scrollIntoView().should('be.visible');

    cy.get('button.map-lens__sidebar').click();

    cy.get('.about__version').should('not.be.visible');

    cy.get('button.map-lens__sidebar').click();

    cy.get('.about__version').should('be.visible');
  });
});
