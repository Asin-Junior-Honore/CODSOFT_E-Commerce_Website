import LoginPage from "../fixtures/loginPage";
const loginPage = new LoginPage();


Cypress.Commands.add('login', (username, password) => {

    loginPage.getUsernameField().type(username)
    loginPage.getPasswordField().type(password)
    loginPage.getLoginBtn().click()


})