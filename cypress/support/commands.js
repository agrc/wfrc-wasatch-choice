// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';

const BASE_URL = 'http://localhost:3000/';
Cypress.Commands.add('waitForMapLoaded', () => {
  return cy.window().should('have.property', 'mapLoaded', true);
});
Cypress.Commands.add('loadApp', url => {
  console.log('loadApp');

  cy.visit(url || BASE_URL);

  cy.waitForMapLoaded();
});
Cypress.Commands.add('getMapExtent', () => {
  cy.waitForMapLoaded();

  let getExtent;

  return cy.window()
    .then((win) => {
      getExtent = win.getMapExtent;
    })
    .then(() => {
      console.log('getting extent...');

      return getExtent();
    });
});
