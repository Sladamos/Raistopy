// cypress/e2e/stops.spec.ts
describe('Stops Page Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5000');
    });
  
    it('should navigate to the Stops page and display stops', () => {
      cy.get('.nav__link').contains('Stops').click();
      cy.url().should('include', '/stops');
      cy.get('h1.stops__title').should('contain', 'All stops');
      cy.get('.stops__wrapper').should('exist');
      cy.get('.stops__wrapper > div').should('have.length.greaterThan', 0);
    });
  });
  