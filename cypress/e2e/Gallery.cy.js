/// <reference types="cypress" />
//S M Riyad Farhan — A00470224
describe("Gallery Page E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8742/gallery");
  });

  it("loads the gallery page with expected content", () => {
    // Page heading
    cy.contains("Enchanting Forest Gallery");

    // Page description
    cy.contains(
      "Discover the breathtaking beauty of forests and serene landscapes"
    );

    // Upload Image button
    cy.contains("Upload Image");

    // Gallery grid exists
    cy.get("#gallery").should("exist");
  });

  it("renders gallery images when data is available", () => {
    // At least one image should be rendered (if Supabase returns data)
    cy.get("#gallery img").should("have.length.greaterThan", 0);
  });

  it("toggles upload image form when button is clicked", () => {
    cy.contains("Upload Image").click();
    cy.contains("Upload Image").should("exist");
  });
});
