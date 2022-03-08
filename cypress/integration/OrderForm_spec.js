describe('OrderForm user flows', () => {
  beforeEach(() => {
    cy.intercept('GET', `http://localhost:3001/api/v1/orders`, {
      orders: [{ id: 1, name: 'Fred', ingredients: ['cheese', 'pork', 'salad'] }]
    })
    cy.intercept('POST', `http://localhost:3001/api/v1/orders`, {
      statusCode: 201,
      body: { id: 2, name: 'Annie', ingredients: ['salmon', 'provolone', 'cabbage'] }
    })
  })

  it('Should display an input, buttons for possible ingredients, an ingredients order and a submission button', () => {
    cy.visit(`http://localhost:3000/`)
      .get('input')
      .should('be.visible')
      .get('button')
      .first()
      .contains('beans')
      .get('p')
      .contains('Order: Nothing selected')
      .get('button')
      .last()
      .contains('Submit Order')
  })

  it('Should be able to input a name and select ingredients', () => {
    cy.get('input')
      .type('Annie')
      .should('have.value', 'Annie')
      .get('button')
      .first().click()
      .get('p')
      .contains('Order: beans')
  })

  it('Should post and display a new order on submission', () => {
    cy.get('input')
      .type('Annie')
      .get('button[name="salmon"').click()
      .get('button[name="provolone"').click()
      .get('button[name="cabbage"').click()
      .get('button').last().click()
      .get('.order')
      .contains('h3', 'Annie')
      .get()
    
  })

});