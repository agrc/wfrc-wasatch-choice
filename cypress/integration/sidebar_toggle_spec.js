describe('sidebar-toggle', () => {
  it('toggles the visibility of the side bar', () => {
    cy.loadApp();

    // we need to scroll manually since cypress doesn't seem to like perfect scrollbar
    cy.get('.about__version').then(element => {
      element.get(0).scrollIntoView();
    });

    cy.get('.about__version').should('be.visible');

    cy.get('button.map-lens__sidebar').click();

    cy.get('.about__version').should('not.be.visible');

    cy.get('button.map-lens__sidebar').click();

    cy.get('.about__version').should('be.visible');
  });
});
