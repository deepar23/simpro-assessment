const baseUrl = Cypress.config('baseUrl');
const testData = require("../../fixtures/fiction.json");

testData.forEach((testCase) => {
    describe("Order Fiction book", () =>{
        before("Visit site", () => {
            cy.visit(baseUrl);
        })

        beforeEach(() => {
            cy.fixture('locators').as('locator');
        })
        
        it("Submit order for"+`${testCase.book_name}` + " in fiction books for " + `${testCase.price}`, () => {
                cy.OrderBook(`${testCase.book_name}`, `${testCase.units}`, `${testCase.price}`);
        })

        /** This fails for $35.80 as the price field accepts only whole numbers */
        it("Order is placed successfully", () => {
            cy.get('@locator').then((locator) => {
                cy.checkOrderPlaced(locator.order);
            })
        })

        /** This fails for $35.80 as the price field accepts only whole numbers */
        it("Check order details", () => {
            cy.get('@locator').then((locator) => {
                cy.checkOrder(locator.bookName, `${testCase.book_name}`);
                cy.checkOrder(locator.bookUnit, `${testCase.units}`);
                cy.checkPrices(locator.bookPrice, `${testCase.price}`);
                let price = `${testCase.price}` * `${testCase.units}`;
                cy.checkPrices(locator.totalPrice, price);
                let discount_price = price*(`${testCase.discount}`/100);
                cy.checkPrices(locator.discountPrice, discount_price.toFixed(2));
                let total_price = price - discount_price;
                cy.checkPrices(locator.finalPrice, total_price.toFixed(2));
            })
        })
    })
    
})

describe("Required field validation", () => {
    before("Visit site", () => {
        cy.visit(baseUrl);
        cy.fixture('locators').as('locator');
    })

    it("Form doesn't submit without inputs", () => {
        cy.get('@locator').then((locator) => {
            cy.get(locator.submit).click();
            cy.get(locator.order).should('not.exist');
        })
    })
})

