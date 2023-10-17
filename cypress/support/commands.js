/* eslint-disable cypress/no-unnecessary-waiting */
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

Cypress.Commands.add('waitForMapLoaded', () => {
  return cy
    .window({ timeout: 120000 })
    .should('have.property', 'mapLoaded', true);
});
Cypress.Commands.add('loadApp', (url = '/') => {
  cy.visit(url);

  cy.waitForMapLoaded();
});
Cypress.Commands.add('getMapExtent', () => {
  cy.waitForMapLoaded();

  let getExtent;

  return cy
    .window()
    .then((win) => {
      getExtent = win.getMapExtent;
    })
    .then(() => {
      console.log('getting extent...');

      return getExtent();
    });
});

// https://github.com/clauderic/dnd-kit/blob/master/cypress/support/commands.ts
function getDocumentScroll() {
  if (document.scrollingElement) {
    const { scrollTop, scrollLeft } = document.scrollingElement;

    return {
      x: scrollTop,
      y: scrollLeft,
    };
  }

  return {
    x: 0,
    y: 0,
  };
}

Cypress.Commands.add(
  'mouseMoveBy',
  {
    prevSubject: 'element',
  },
  (subject, x, y, options) => {
    cy.wrap(subject, { log: false })
      .then((subject) => {
        const initialRect = subject.get(0).getBoundingClientRect();
        const windowScroll = getDocumentScroll();

        return [subject, initialRect, windowScroll];
      })
      .then(([subject, initialRect, initialWindowScroll]) => {
        cy.wrap(subject)
          .trigger('mousedown', { force: true })
          .wait(options?.delay || 0, { log: Boolean(options?.delay) })
          .trigger('mousemove', {
            force: true,
            clientX: Math.floor(
              initialRect.left + initialRect.width / 2 + x / 2,
            ),
            clientY: Math.floor(
              initialRect.top + initialRect.height / 2 + y / 2,
            ),
          })
          .trigger('mousemove', {
            force: true,
            clientX: Math.floor(initialRect.left + initialRect.width / 2 + x),
            clientY: Math.floor(initialRect.top + initialRect.height / 2 + y),
          })
          .wait(100)
          .trigger('mouseup', { force: true })
          .wait(250)
          .then((subject) => {
            const finalRect = subject.get(0).getBoundingClientRect();
            const windowScroll = getDocumentScroll();
            const windowScrollDelta = {
              x: windowScroll.x - initialWindowScroll.x,
              y: windowScroll.y - initialWindowScroll.y,
            };

            const delta = {
              x: Math.round(
                finalRect.left - initialRect.left - windowScrollDelta.x,
              ),
              y: Math.round(
                finalRect.top - initialRect.top - windowScrollDelta.y,
              ),
            };

            return [subject, { initialRect, finalRect, delta }];
          });
      });
  },
);
