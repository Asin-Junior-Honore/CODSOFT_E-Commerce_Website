class LoginPage {

    getUsernameField() {
        return cy.get("input[placeholder='Username']")

    }

    getPasswordField() {
        return cy.get("input[placeholder='Password']")
    }

    getLoginBtn() {
        return cy.get("button[type='submit']")
    }

    getLoginConfirmation() {
        return cy.get(".Toastify__toast-body > :nth-child(2)")
    }


    getErrorMessage() {
        return cy.get(".text-red-500")
    }

}

export default LoginPage