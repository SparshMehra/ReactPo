/**
 * This file performs end-to-end (E2E) testing of the Ecommerce page, validating page rendering, product display, add-to-cart functionality, cart updates, and user feedback interactions.
 * @Author-Bhabin Chudal(A00464169)
 */
describe("Ecommerce Page E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8742/ecommerce");
  });

  it("loads the ecommerce page with header content", () => {
    cy.contains("Woodland Conservation Merchandise").should("be.visible");

    cy.contains(
      "Support conservation by purchasing eco-friendly merchandise"
    ).should("be.visible");
  });

  it("displays all products with name and price", () => {
    cy.contains("Eco-Friendly T-Shirt").should("be.visible");
    cy.contains("$25").should("be.visible");

    cy.contains("Reusable Tote Bag").should("be.visible");
    cy.contains("$15").should("be.visible");

    cy.contains("Bamboo Water Bottle").should("be.visible");
    cy.contains("$30").should("be.visible");

    cy.contains("Conservation Cap").should("be.visible");
    cy.contains("$20").should("be.visible");
  });

  it("adds a product to the cart and shows alert", () => {
    // Stub browser alert
    cy.window().then((win) => {
      cy.stub(win, "alert").as("alert");
    });

    cy.contains("Add to Cart 🛒").first().click();

    cy.get("@alert").should(
      "have.been.calledWith",
      "✅ Eco-Friendly T-Shirt added to cart!"
    );
  });

  it("updates cart badge when item is added", () => {
    cy.contains("Add to Cart 🛒").first().click();

    cy.contains("item(s) in your cart").should("be.visible");
    cy.contains("🛒 1 item(s) in your cart").should("be.visible");
  });

  it("increments quantity when same product is added again", () => {
    cy.window().then((win) => {
      cy.stub(win, "alert").as("alert");
    });

    // Add same item twice
    cy.contains("Add to Cart 🛒").first().click();
    cy.contains("Add to Cart 🛒").first().click();

    cy.get("@alert").should(
      "have.been.calledWith",
      "✅ Eco-Friendly T-Shirt quantity updated in cart!"
    );

    cy.contains("🛒 2 item(s) in your cart").should("be.visible");
  });

  it("displays bottom call-to-action section", () => {
    cy.contains("Make a Difference Today").should("be.visible");

    cy.contains(
      "All proceeds from merchandise sales go directly to woodland conservation efforts"
    ).should("be.visible");
  });
});
