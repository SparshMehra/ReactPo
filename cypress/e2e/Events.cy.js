/// <reference types="cypress" />
//Abdiaziz Muse — A00471783 

describe("Events Page E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8742/events");
  });

  it("loads the Events page with header content", () => {
    // Main heading
    cy.contains("Upcoming Events & Activities");

    // Description text
    cy.contains(
      "Join us for exciting conservation events, educational workshops, and outdoor adventures"
    );
  });

  it("displays event filters", () => {
    // Filters are rendered via EventFilters component
    cy.contains("Category");
    cy.contains("Date");
  });

  it("shows events list or no-events message", () => {
    // Either events are shown or 'No events found'
    cy.contains(/Showing|No events found/);
  });

  it("opens event details when Learn More is clicked (if events exist)", () => {
    // Only run if at least one event card exists
    cy.get("body").then(($body) => {
      if ($body.text().includes("Learn More")) {
        cy.contains("Learn More").first().click();

        // Event details modal content
        cy.contains("Book Now").should("be.visible");
      }
    });
  });
});
