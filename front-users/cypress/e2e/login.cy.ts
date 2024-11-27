// cypress/e2e/login.spec.ts
describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/login');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('input[id="email"]').type('kwik@wp.pl');
    cy.get('input[id="password"]').type('zaq21wsxcde43rfv');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/');
    cy.get('#welcome-message').should('contain', 'Welcome, kwik@wp.pl!');
  });

  it('should show an error for invalid credentials', () => {
    cy.get('input[id="email"]').type('kwik@wp.pl');
    cy.get('input[id="password"]').type('ugabuga');
    cy.get('button[type="submit"]').click();

    // Sprawdza komunikat błędu
    cy.get('#error-message').should('contain', 'Incorrect email or password');
  });
});
