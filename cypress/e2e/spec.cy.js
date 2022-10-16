describe("renders the home page", () => {
    it("renders main component", () => {
        cy.visit("/");
        cy.get("main").should("exist");
    });

    it("allows me to target dialogue component from data-testid attribute", () => {
        cy.visit("/");
        cy.get(`[data-testid="dialogue-wrapper"]`).should("exist");
    });

    it("allows me to reset the textfield", () => {
        cy.visit("/");
        cy.wait(10000);
        cy.get(`[data-testid="reset-button"]`).click();
        cy.get(`[data-testid="user-input"]`).should("have.value", '');
    })
});