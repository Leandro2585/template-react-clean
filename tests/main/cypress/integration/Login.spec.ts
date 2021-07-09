import faker from 'faker'
import * as Http from '../utils/HttpMocks'
import * as FormHelper from '../utils/FormHelper'
import * as Helpers from '../utils/Helpers'

const path = /login/

const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(path)

const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')

const mockSuccess = (): void => Http.mockOk(path, 'POST', 'fx:account')

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Required field')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Required field')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should reset state on page load', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')
    cy.getByTestId('signup-link').click()
    cy.getByTestId('login-link').click()
    FormHelper.testInputStatus('email', 'Required field')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Invalid field value')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('password', 'Invalid field value')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
    FormHelper.testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    FormHelper.testMainError('Invalid credentials')
    Helpers.testUrl('/login')
  })

  it('should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Something wrong happened. Try again soon.')
    Helpers.testUrl('/login')
  })

  it('should present save account if valid credentials are provided', () => {
    mockSuccess()
    simulateValidSubmit()
    cy.getByTestId('error-wrap').should('not.have.descendants')
    Helpers.testUrl('/')
    Helpers.testLocalStorageItem('@4Devs:account')
  })

  it('should prevent multiple submits', () => {
    mockSuccess()
    populateFields()
    cy.getByTestId('submit').dblclick()
    cy.wait('@request')
    Helpers.testHttpCallsCount(1)
  })

  it('should not call submit if form is invalid', () => {
    mockSuccess()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    Helpers.testHttpCallsCount(0)
  })
})
