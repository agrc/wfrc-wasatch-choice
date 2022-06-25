describe('tab-picker', () => {
  it('removes a tab', () => {
    cy.loadApp();

    cy.findByLabelText('Transportation Tab').should('be.visible');

    cy.findByTestId('tab-configuration').click();

    cy.findByRole('listbox', { name: /maps displayed/i }).select('transportation');
    cy.findByRole('option', { name: /transportation/i }).dblclick();

    cy.findByRole('button', { name: /finish/i }).click();

    cy.findByLabelText('Transportation Tab').should('not.exist');
  });

  it('replaces a tab', () => {
    cy.loadApp();

    cy.findByTestId('tab-configuration').click();

    cy.findByRole('listbox', { name: /maps displayed/i }).select('transportation');

    cy.findByRole('option', { name: /transportation/i }).dblclick();

    cy.findByRole('listbox', { name: /available/i }).select('open-space');

    cy.findByRole('option', { name: /open space/i }).dblclick();

    cy.findByRole('button', { name: /finish/i }).click();

    cy.findByLabelText('Open Space Tab').should('be.visible');
  });

  it('shows too many tabs alert', () => {
    cy.loadApp();

    cy.findByTestId('tab-configuration').click();

    cy.findByRole('listbox', { name: /available/i }).select('open-space');

    cy.findByRole('option', { name: /open space/i }).dblclick();

    cy.findByRole('alert', { text: /maximum/i }).should('be.visible');
  });
});
