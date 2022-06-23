const baseUrl = Cypress.config('baseUrl');
const testData = require("../../fixtures/fiction.json");

testData.forEach((testCase) => {
    describe("Order Fiction book", () =>{
        before("Visit site", () => {
            cy.visit(baseUrl);
            cy.fixture('locators').as('locator');
        })
    
        it("Order "+`${testCase.book_name}` + " in fiction books for " + `${testCase.price}`, () => {
            cy.get('@locator').then((locator) => {
                cy.OrderBook(`${testCase.book_name}`, `${testCase.units}`, `${testCase.price}`);
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
