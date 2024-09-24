class ProductsPage {

    getAllProducts() {
        return cy.get('.hidden > [href="/protected/products"]')

    }

    getProductType() {
        return cy.get('ul').find('li')
    }

    getAddToCartBtn() {
        return cy.get(':nth-child(20) > .p-4 > .flex.mt-4 > .mt-4')
    }

    getCart() {
        return cy.get('.hidden > [href="/protected/cart"]')
    }

    getDeleteAllItemsBtn() {
        return cy.get('.deleteall-logic > .bg-red-500')
    }

    getEmptyCartText() {
        return cy.get('.container > .flex > .text-xl')
    }


}

export default ProductsPage