describe('project-information', () => {
  it('populates the data when a feature is clicked', () => {
    cy.loadApp('#scale=577791&sideBarClosed=true&x=-12467542&y=4976323');

    cy.get('.esri-view-root canvas').click();

    cy.get('.project-information .details');
  });
  it('shows the details', () => {
    cy.loadApp('#scale=577791&sideBarClosed=true&x=-12467542&y=4976323');

    cy.get('.esri-view-root canvas').click();

    cy.get(':nth-child(1) > .title').click();

    cy.findByRole('columnheader', { name: /name/i });
  });
});
