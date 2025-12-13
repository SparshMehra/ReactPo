// cypress/e2e/header.cy.js
//Abdiaziz Muse — A00471783 
describe("Header Navigation Test", () => {
  it("Navigates to the Events page when the Events link is clicked", () => {
    // Use the UGDEV URL for grading; change to localhost when testing locally
    cy.visit("http://localhost:8742/");

    // Click the "Events" link in the site header
    cy.contains("Events").click();

    // Confirm we navigated to /events
    cy.url().should("include", "/events");
  });
});
