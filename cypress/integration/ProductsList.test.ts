export const API_URL = "https://www.something_APP_URL.com";
describe("Listing products on the homepage", () => {
  it("Loads products from the server", () => {
    const productOne = "Product one name";
    const productTwo = "Product two name";

    cy.intercept("GET", API_URL, {
      body: [productOne, productTwo],
    });

    cy.visit("http://localhost:3000/");
    cy.contains(productOne);
    cy.contains(productTwo);
  });
});
