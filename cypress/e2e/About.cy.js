/// <reference types="cypress" />

describe("About Page E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8742/about");
  });

  it("loads the About page with main content", () => {
    // Main heading
    cy.contains("About St. Margaret’s Bay Area Woodland Conservation Site");

    // Mission section heading
    cy.contains("Mission Statement");

    // Vision section heading
    cy.contains("Vision");

    // Hero image
    cy.get('img[alt="Woodland Outlook"]').should("be.visible");
  });

  it("expands and collapses the Flora and Fauna accordion", () => {
    // Expand
    cy.contains("Flora and Fauna").click();
    cy.contains("Flora: Red Maple").should("be.visible");

    // Collapse
    cy.contains("Flora and Fauna").click();
    cy.contains("Flora: Red Maple").should("not.be.visible");
  });

  it("expands and collapses the Heritage and Legacy accordion", () => {
    // Expand
    cy.contains("Heritage and Legacy").click();
    cy.contains("The woodland is a testament to the natural history").should(
      "be.visible"
    );

    // Collapse
    cy.contains("Heritage and Legacy").click();
    cy.contains("The woodland is a testament to the natural history").should(
      "not.be.visible"
    );
  });

  it("toggles mission statement text using Learn More button", () => {
    // Expand mission text
    cy.contains("Learn More").click();
    cy.contains("We aim to protect habitats").should("be.visible");

    // Collapse mission text
    cy.contains("Show Less").click();
    cy.contains("We aim to protect habitats").should("not.exist");
  });
});
