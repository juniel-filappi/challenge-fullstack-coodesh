describe('check components in home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('verify if home page is complete and loaded', () => {
    cy.get("div#__next").should("exist");
    cy.dataCy("image-logo-header").should("exist");
    cy.dataCy("text-welcome").should("exist").contains("Bem vindo ao sistema da Coodesh");
    cy.dataCy("button-login").should("exist").contains("Acessar");
  })

  it("Test if button login is working", () => {
    cy.dataCy("button-login").click();
    cy.url().should("include", "/login");
  });
})


export {}