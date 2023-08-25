describe('tab-picker', () => {
  it('removes a tab', () => {
    cy.loadApp();

    cy.findByLabelText('Transportation Tab').should('be.visible');

    cy.findByTestId('tab-configuration').click();

    cy.findByRole('listbox', { name: /maps displayed/i }).select(
      'transportation',
    );
    cy.findByRole('option', { name: /^transportation$/i }).dblclick();

    cy.findByRole('button', { name: /finish/i }).click();

    cy.findByLabelText('Transportation Tab').should('not.exist');
  });

  it('replaces a tab', () => {
    cy.loadApp();

    cy.findByTestId('tab-configuration').click();

    cy.findByRole('listbox', { name: /maps displayed/i }).select(
      'transportation',
    );

    cy.findByRole('option', { name: /^transportation$/i }).dblclick();

    cy.findByRole('listbox', { name: /available/i }).select('projections');

    cy.findByRole('option', { name: /projections/i }).dblclick();

    cy.findByRole('button', { name: /finish/i }).click();

    cy.findByLabelText('Growth Projections Tab').should('be.visible');
  });

  it('shows too many tabs alert', () => {
    cy.loadApp();

    cy.findByTestId('tab-configuration').click();

    cy.findByRole('listbox', { name: /available/i }).select('projections');
    cy.findByRole('option', { name: /projections/i }).dblclick();

    cy.findByRole('listbox', { name: /available/i }).select(
      'stationareaplanning',
    );
    cy.findByRole('option', { name: /station area planning/i }).dblclick();

    cy.findByRole('listbox', { name: /available/i }).select('gflu');
    cy.findByRole('option', { name: /future land use/i }).dblclick();

    cy.findByRole('listbox', { name: /available/i }).select('tip');
    cy.findByRole('option', { name: /tip projects/i }).dblclick();

    cy.findByRole('listbox', { name: /available/i }).select('tlc');
    cy.findByRole('option', { name: /tlc projects/i }).dblclick();

    cy.findByRole('listbox', { name: /available/i }).select('atdata');
    cy.findByRole('option', { name: /active transportation/i }).dblclick();

    cy.findByRole('listbox', { name: /available/i }).select('ato');
    cy.findByRole('option', { name: /access to opportunities/i }).dblclick();

    cy.findByRole('alert', { text: /maximum/i }).should('be.visible');
  });
});
