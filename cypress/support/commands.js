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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const testData = require("../fixtures/fiction.json");
const baseUrl = Cypress.config('baseUrl');

before(() => {
    cy.fixture('locators').as('locator');
    cy.get('@locator').then((locator) => {
        Cypress.Commands.add("OrderBook", (book, unit, price) => {
            cy.get(locator.book).select(book).should('have.value', book);
            cy.get(locator.unit).type(unit).should('have.value', unit);
            cy.get(locator.price).type(price).should('have.value', price);
            cy.get(locator.submit).click();
        })

        Cypress.Commands.add("OrderBookWithDiscount", (book, unit, price, discount) => {
            cy.get(locator.drama).click();
            cy.get(locator.book).select(book).should('have.value', book);
            cy.get(locator.unit).type(unit).should('have.value', unit);
            cy.get(locator.price).type(price).should('have.value', price);
            cy.get(locator.discount).click();
            cy.get(locator.discountPercent).type(discount).should('have.value', discount);
            cy.get(locator.submit).click();
        })

        Cypress.Commands.add("checkOrder", (name, value) => {
            cy.get(name).then(elem => {
                expect(elem.text()).to.eq(value);
            });
        })

        Cypress.Commands.add("checkPrices", (name, value) => {
            cy.get(name).then(elem => {
                expect(elem.text()).to.eq('$ ' + value);
            });
        })

        Cypress.Commands.add("deleteAnOrder", (name, value) => {
            cy.get(locator.delete).click();
            cy.contains(locator.confirmDelete).click();
            cy.get(locator.order).should('not.exist');
        })

    })
})




