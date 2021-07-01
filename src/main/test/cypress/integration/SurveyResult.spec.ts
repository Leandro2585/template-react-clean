import * as Helper from '../utils/Helpers'
import * as Http from '../utils/HttpMocks'

const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockSuccess = (): void => Http.mockOk(path, 'GET', 'fx:survey-result')

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

  it('should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Something wrong happened. Try again soon.')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.getByTestId('question').should('exist')
  })

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })
})
