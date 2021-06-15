import * as Helper from '../utils/Helpers'
import * as Http from '../utils/HttpMocks'

const mockUnexpectedError = (): void => Http.mockServerError(/surveys/, 'POST')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(/surveys/, 'GET')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('@4Devs:account', account)
    })
  })

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('container.text', 'Something wrong happened. Try again soon.')
  })

  it('should logout on AccessDeniededError', () => {
    mockAccessDeniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    mockUnexpectedError()
    cy.visit('')
    const { name } = Helper.getLocalStorageItem('@4Devs:account')
    cy.getByTestId('error').should('container.text', name)
  })

  it('should logout on logout link click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    Helper.testUrl('/login')
  })
})
