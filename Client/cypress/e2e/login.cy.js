import LoginPage from "../fixtures/loginPage";

const loginPage = new LoginPage();

describe("login", () => {
    beforeEach(() => {
        cy.visit("/login")

    })

    it("attempt to login with no credentials", () => {
        loginPage.getLoginBtn().click()
        loginPage.getErrorMessage().contains("Username is required")
        loginPage.getErrorMessage().contains("Password is required")
    })


    it("attempt to login without inputting password", () => {
        loginPage.getUsernameField().type("Mojisola")
        loginPage.getLoginBtn().click()
        loginPage.getErrorMessage().contains("Password is required")
    })

    it("attempt to login without inputting username", () => {
        loginPage.getPasswordField().type("Mojisola123")
        loginPage.getLoginBtn().click()
        loginPage.getErrorMessage().contains("Username is required")
    })


    it.only("attempt to login with an invalid username", () => {
        cy.login('Moji', 'Mojisola123')
        loginPage.getLoginConfirmation({ timeout: 10000 }) // Wait up to 10 seconds to get the element
            .should("be.visible")
            .and("contain", "Sorry, User not found");

    })

    it.only("attempt to login with an invalid password", () => {
        cy.login('Mojisola', 'Moji')
        loginPage.getLoginConfirmation({ timeout: 10000 }) // Wait up to 10 seconds to get the element
            .should("be.visible")
            .and("contain", "Sorry, Invalid credentials");
    })

    it.only("attempt to login with an invalid credentials", () => {
        cy.login('Moji', 'Moji')
        loginPage.getLoginConfirmation({ timeout: 10000 }) // Wait up to 10 seconds to get the element
            .should("be.visible")
            .and("contain", "Sorry, User not found");

    })


    it("login", () => {
        cy.login('Mojisola', 'Mojisola123')
        loginPage.getLoginConfirmation({ timeout: 10000 })
            .should("be.visible")
            .and("contain", "Login successful! Redirecting...")
    })
})