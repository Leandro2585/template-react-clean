import * as Helper from '../utils/Helpers'
import * as Http from '../utils/HttpMocks'

const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('@4Devs:account', account)
    })
  })

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Something wrong happened. Try again soon.')
  })
})
