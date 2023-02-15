describe("Test Dashboard Page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.dataCy("login-input-email").type("teste@teste.com");
    cy.dataCy("login-input-password").type("123456");

    cy.dataCy("login-button-submit").click();

    cy.url().should("include", "/dashboard");
  });

  it("Test Components with dashboard page", () => {
    cy.dataCy("dashboard-title").should("exist").contains("Dashboard");
    cy.dataCy("dashboard-subtitle")
      .should("exist")
      .contains("Lista de vendas cadastradas");
    cy.dataCy("dashboard-button-logout").should("exist");
    cy.dataCy("dashboard-button-upload").should("exist");
    cy.dataCy("dashboard-table").should("exist");

    cy.dataCy("dashboard-button-upload").click();
    cy.dataCy("dashboard-modal-upload").should("exist");
    cy.dataCy("dashboard-modal-title")
      .should("exist")
      .contains("Upload de Vendas");
    cy.dataCy("dashboard-modal-upload-button-close").should("exist").click();
  });

  it("Test if upload file is working", () => {
    cy.dataCy("dashboard-button-upload").click();
    cy.dataCy("dashboard-input-file")
      .should("exist")
      .selectFile("cypress/fixtures/sales.txt");
    cy.dataCy("dashboard-button-send-file").click();

    cy.get("#swal2-html-container")
      .should("exist")
      .contains("Upload realizado com sucesso");
  });

  it("Test delete sale is working", () => {
    cy.dataCy("dashboard-button-delete-sale").first().click();

    cy.dataCy("dashboard-button-deny-delete").should("exist");
    cy.dataCy("dashboard-button-confirm-delete").should("exist").click();

    cy.get("#swal2-html-container")
      .should("exist")
      .contains("Venda deletada com sucesso!");
  });

  it("Test delete all sale in the first page is working", () => {
    cy.dataCy("dashboard-button-delete-sale").each((element) => {
      cy.wrap(element).click();
      cy.dataCy("dashboard-button-deny-delete").should("exist");
      cy.dataCy("dashboard-button-confirm-delete").should("exist").click();
    });
  });
});

export {};
