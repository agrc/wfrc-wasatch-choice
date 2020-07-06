describe('tabs', () => {
  it('switching tabs preserves map extent', () => {
    cy.server();

    cy.route('**/ArcGIS/rest/services/World_Topo_Map/MapServer/**').as('baseMapTiles');

    cy.visit('http://localhost:3000/');

    cy.wait(['@baseMapTiles']);

    const zoomInButton = cy.findByRole('button', { name: /zoom in/i });
    zoomInButton.click({ force: true });
    zoomInButton.click({ force: true });

    let getExtent;
    cy.window()
      .then((win) => {
        getExtent = win.getMapExtent;
      })
      .then(() => {
        const originalExtent = getExtent();

        cy.findByLabelText('Land Use Tab').click();

        expect(getExtent()).to.equal(originalExtent);
      });
  });
});
