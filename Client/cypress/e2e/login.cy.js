describe("login", () => {
  beforeEach(() => {
      cy.visit("/login")
  })

  it("login", () => {
      cy.get("input[placeholder='Username']").type("Mojisola")
      cy.get("input[placeholder='Password']").type("Mojisola123")
      cy.get("button[type='submit']").click()
  })
})