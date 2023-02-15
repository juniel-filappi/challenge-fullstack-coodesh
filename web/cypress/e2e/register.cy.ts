describe("Test Register Page", () => {
  beforeEach(() => {
    cy.visit("/register");
  })

  it("Test if components its in register page", () => {
    cy.dataCy("register-title").should("exist").contains("Registrar-se");
    cy.dataCy("register-input-name").should("exist");
    cy.dataCy("register-input-email").should("exist");
    cy.dataCy("register-input-password").should("exist");
    cy.dataCy("register-link-login").should("exist").contains("Faça o login");
    cy.dataCy("register-button-submit").should("exist").contains("Criar conta");
  })

  it("Test if register is working", () => {
    const mathNumber = Math.round(Math.random() * 1000)

    cy.dataCy("register-input-name").type("Rafael");
    cy.dataCy("register-input-email").type(`rafa${mathNumber}@email.com`);
    cy.dataCy("register-input-password").type("123456");
    cy.dataCy("register-button-submit").click();

    cy.url().should("include", "/login");
    cy.get("#swal2-html-container").should("exist").contains("Conta criada com sucesso, faça o login para começar a registrar suas vendas");
  })

  it("Test if register is working with email exists", () => {
    cy.dataCy("register-input-name").type("Alice");
    cy.dataCy("register-input-email").type("teste@teste.com");
    cy.dataCy("register-input-password").type("123456");
    cy.dataCy("register-button-submit").click();

    cy.get("#swal2-html-container").should("exist").contains("Usuário já existe");
  })

  it("Test click button submit without type input", () => {
    cy.dataCy("register-button-submit").click();

    cy.dataCy("register-input-name-error").should("exist").contains("Nome é obrigatório")
    cy.dataCy("register-input-email-error").should("exist").contains("Email é obrigatório")
    cy.dataCy("register-input-password-error").should("exist").contains("Senha é obrigatória")
  })
})


export {}