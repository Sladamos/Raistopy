// cypress/e2e/logout.spec.ts
describe('Authentication Tests', () => {
    const baseUrl = 'http://localhost:5000';
  
    beforeEach(() => {
      cy.visit(baseUrl);
    });
  
    it('should not display the logout button for unauthenticated users', () => {
      cy.get('.nav-link').contains('Logout').should('not.exist');
    });

    it('should prevent unauthenticated users from accessing the /logout route', () => {
        cy.visit(`${baseUrl}/logout`);
        cy.url().should('not.include', '/logout');
        cy.url().should('include', '/login');
    });

    it('should allow logged-in users to logout and see the login button', () => {
        cy.visit(`${baseUrl}/login`);
        cy.get('input[id="email"]').type('kwik@wp.pl');
        cy.get('input[id="password"]').type('zaq21wsxcde43rfv');
        cy.get('button[type="submit"]').click();
        cy.get('.nav-link').contains('Logout').should('be.visible');
        cy.get('.nav-link').contains('Login').should('not.exist');
        cy.get('.nav-link').contains('Logout').click();
        cy.url().should('include', '/');
        cy.get('.nav-link').contains('Login').should('be.visible');
        cy.get('.nav-link').contains('Logout').should('not.exist');
      });
});