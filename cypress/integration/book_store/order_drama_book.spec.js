const baseUrl = Cypress.config('baseUrl');
const testData = require("../../fixtures/drama.json");

testData.forEach((testCase) => {
    describe("Order Drama book", () =>{

        before("Visit site", () => { 
            cy.visit(baseUrl);
            cy.fixture('locators').as('locator');
        })
        
        /*** This fails for $126 as the user should be able to 
         * order a drama called “The Rainbow” for no more than $125.00. Here, user ia able to roder 
         * the book for more than $126 and hence I fail the test ***/ 
        it("Order "+`${testCase.book_name}` + " in drama for " + `${testCase.price}`, () => {
            cy.get('@locator').then((locator) => {
                cy.OrderBookWithDiscount(`${testCase.book_name}`, `${testCase.units}`, `${testCase.price}`, `${testCase.discount}`);
                if(`${testCase.result}` === 'fail'){
                    cy.get(locator.bookName).should('not.exist');
                }
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

        it("Delete record", () => {
            cy.deleteAnOrder();
        })
    })
})