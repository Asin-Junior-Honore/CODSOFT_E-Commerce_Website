import ProductsPage from "../fixtures/productsPage";

const productsPage = new ProductsPage();

describe("products", () => {
    beforeEach(() => {
        cy.visit("/login")
    })

    // do not add cy.wait to the final code

    it("view all products", () => {
        // Log in with provided credentials
        cy.login('Mojisola', 'Mojisola123');

        cy.wait(4000)


        // Click on "All Products" and ensure the element is visible first
        productsPage.getAllProducts().contains("All Products")
            .should("be.visible").click();

        // Scroll to the bottom and back to the top again
        cy.scrollTo('bottom');
        cy.scrollTo('top');

        cy.wait(2000)

        // Click on "men's clothing" and ensure the element is visible first
        productsPage.getProductType().contains("men's clothing")
            .should("be.visible").click();

        // Scroll to the bottom and back to the top again
        cy.scrollTo('bottom');
        cy.scrollTo('top');

        cy.wait(2000)

        // Click on "jewelery" and ensure the element is visible first
        productsPage.getProductType().contains("jewelery")
            .should("be.visible").click();

        // Scroll to the bottom and back to the top again
        cy.scrollTo('bottom');
        cy.scrollTo('top');

        cy.wait(2000)

        // Click on "women's clothing" and ensure the element is visible first
        productsPage.getProductType().contains("women's clothing")
            .should("be.visible").click();

        // Scroll to the bottom and back to the top again
        cy.scrollTo('bottom');
        cy.scrollTo('top');

        cy.wait(2000)

        // Click on "electronics" and ensure the element is visible first
        productsPage.getProductType().contains("electronics")
            .should("be.visible").click();
    });


    it("add a product to cart, then delete it", () => {
        cy.login('Mojisola', 'Mojisola123')
        cy.wait(4000)

        productsPage.getAllProducts().contains("All Products").click();
        cy.scrollTo('bottom')
        productsPage.getAddToCartBtn().click()
        cy.scrollTo('top')
        productsPage.getCart().contains('My Cart').click()
        cy.wait(4000)
        productsPage.getDeleteAllItemsBtn().click()
        productsPage.getEmptyCartText()
            // 'invoke' gets the text content of the element
            .invoke('text').then((text) => {
                // Trim any leading/trailing spaces and compare the text to 'Your cart is empty'
                expect(text.trim()).to.eq('Your cart is empty');
            });
    })



})