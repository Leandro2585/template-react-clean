import * as Helper from '../utils/Helpers'

describe('PrivateRoute', () => {
  it('should logout if private screen has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('should logout if survey-result has no token', () => {
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })
})
