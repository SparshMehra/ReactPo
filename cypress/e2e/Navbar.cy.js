describe("Navbar Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8742");
  });

  const links = [
    { text: "About", path: "/about" },
    { text: "Site Map", path: "/sitemap" }, // <-- fixed
    { text: "Gallery", path: "/gallery" },
    { text: "Events", path: "/events" },
    { text: "Natural Burial", path: "/natural-burial" }, // change if different
    { text: "Contact", path: "/contact" },
    { text: "Ecosystem/Vegetation", path: "/ecoveg" }, // change if different
    { text: "Ecommerce", path: "/ecommerce" }, // change if different
  ];

  links.forEach((link) => {
    it(`Navbar link works: ${link.text}`, () => {
      cy.contains(link.text).click();
      cy.url().should("include", link.path);
      cy.go("back"); // return to home for the next test
    });
  });
});
