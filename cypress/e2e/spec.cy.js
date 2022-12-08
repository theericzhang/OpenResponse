describe("renders the home page", () => {
    it("renders main component", () => {
        cy.visit("/");
        cy.get(`[data-testid="main"]`).should("exist");
    });

    it("allows me to target dialogue component from data-testid attribute", () => {
        cy.visit("/");
        cy.get(`[data-testid="dialogue-wrapper"]`).should("exist");
    });
});

describe("actions on the home page", () => {
    it("allows me to reset the textfield", () => {
        cy.visit("/");
        cy.wait(7000);
        cy.get(`[data-testid="reset-button"]`).click();
        cy.get(`[data-testid="user-input"]`).should("have.value", '');
    });
    it("allows me to enter in a value into the input", () => {
        cy.get(`[data-testid="user-input"]`)
            .should("be.visible")
            .click()
            .type("What's at the end of a black hole?")
    });
    it("allows me to submit my request", () => {
        cy.get(`[data-testid="submit-prompt-button"]`)
            .should("be.visible")
            .click()
    });
    it("gets back a response", () => {
        cy.get(`[data-testid="response-text-wrapper"]`)
            .wait(4000)
            .should("not.be.empty");
    })
})