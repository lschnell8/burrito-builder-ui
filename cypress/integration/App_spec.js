describe('App user flows', () => {
  beforeEach(() => {
    cy.intercept('GET', `http://localhost:3001/api/v1/orders`, {
      orders: [{ id: 1, name: 'Fred', ingredients: ['cheese', 'pork', 'salad'] }]
    })
  })

  it('Should display a title, a form, and existing orders', () => {
    cy.visit(`http://localhost:3000/`)
      .contains('h1', 'Burrito Builder')
      .get('.order-form')
      .should('be.visible')
      .get('.order-container')
      .should('be.visible')
  });

  it('Should have existing orders with a name and ingredients', () => {
    cy.get('.order')
      .contains('h3', 'Fred')
      .get('.ingredient-list')
      .contains('li', 'cheese')
  })

});