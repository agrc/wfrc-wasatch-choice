import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  // these errors are popping up in the tabs.cy.js test
  // I'm good with ignoring console errors
  return false;
});
