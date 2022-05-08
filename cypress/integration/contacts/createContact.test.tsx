const contactData = {
  firstName: "John",
  lastName: "Doe",
  email: "john@gmail.com",
  phone: 983042131
};

describe("Contacts", () => {
  before(() => {
    cy.visit("/");
    cy.contains("Backbone Systems");
  });

  beforeEach(() => {
    cy.get(`[data-cy="menu-contacts"]`).click();
    cy.contains("Contacts list");
  });

  it("Submit create contact form without data", () => {
    cy.get(`[data-cy="contacts-table"]`).should("be.visible");

    cy.get(`[data-cy="create-contact"]`).click();

    cy.get(`[data-cy="button-save"]`).click();
    cy.contains("This is required.");
  });

  it("Submit create contact form with bad email", () => {
    cy.get(`[data-cy="contacts-table"]`).should("be.visible");

    cy.get(`[data-cy="create-contact"]`).click();

    cy.get(`[data-cy="field-firstName"]`).type(contactData.firstName);
    cy.get(`[data-cy="field-lastName"]`).type(contactData.lastName);
    cy.get(`[data-cy="field-email"]`).type("estoo@");
    cy.get(`[data-cy="field-phone"]`).type(contactData.phone);

    cy.get(`[data-cy="button-save"]`).click();
    cy.contains("Enter a valid email.");
  });

  it("Create new contact", () => {
    cy.get(`[data-cy="contacts-table"]`).should("be.visible");

    cy.get(`[data-cy="create-contact"]`).click();

    cy.get(`[data-cy="field-firstName"]`).type(contactData.firstName);
    cy.get(`[data-cy="field-lastName"]`).type(contactData.lastName);
    cy.get(`[data-cy="field-email"]`).type(contactData.email);
    cy.get(`[data-cy="field-phone"]`).type(contactData.phone);

    cy.get(`[data-cy="button-save"]`).click();
    cy.contains("The contact was saved.");
  });

  it("Create new contact with existent data", () => {
    cy.get(`[data-cy="contacts-table"]`).should("be.visible");

    cy.get(`[data-cy="create-contact"]`).click();

    cy.get(`[data-cy="field-firstName"]`).type(contactData.firstName);
    cy.get(`[data-cy="field-lastName"]`).type(contactData.lastName);
    cy.get(`[data-cy="field-email"]`).type(contactData.email);
    cy.get(`[data-cy="field-phone"]`).type(contactData.phone);

    cy.get(`[data-cy="button-save"]`).click();
    cy.contains("This email address already exists!");
  });
});

