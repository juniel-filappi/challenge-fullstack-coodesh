describe("Test Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Test if components its in login page", () => {
    cy.dataCy("title-login").should("exist").contains("Login");
    cy.dataCy("subtitle-login").should("exist").contains("Faça o login para continuar");

    cy.dataCy("login-input-email").should("exist");
    cy.dataCy("login-input-password").should("exist");
    cy.dataCy("login-link-register").should("exist").contains("Faça o cadastro");
    cy.dataCy("login-button-submit").should("exist").contains("Entrar");
  });

  it("Test if button register is working", () => {
    cy.dataCy("login-link-register").click();
    cy.url().should("include", "/register");
  });

  it("Test if login is working", () => {
    cy.dataCy("login-input-email").type("teste@teste.com");
    cy.dataCy("login-input-password").type("123456");
    cy.dataCy("login-button-submit").click();
    cy.url().should("include", "/dashboard");
  });

  it("Test if login is working with wrong password", () => {
    cy.dataCy("login-input-email").type("teste@teste.com");
    cy.dataCy("login-input-password").type("1234567");
    cy.dataCy("login-button-submit").click();
    cy.get("#swal2-html-container").should("exist").contains("Senha incorreta");
  });

  it("Test if login is working with wrong email", () => {
    cy.dataCy("login-input-email").type("teste2@teste.com");
    cy.dataCy("login-input-password").type("123456");
    cy.dataCy("login-button-submit").click();
    cy.get("#swal2-html-container").should("exist").contains("Usuário não existe");
  });
})

export {}