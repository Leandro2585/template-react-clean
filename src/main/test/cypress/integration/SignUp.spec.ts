import faker from 'faker'
import * as Http from '../utils/HttpMocks'
import * as FormHelper from '../utils/FormHelper'
import * as Helpers from '../utils/Helpers'

const path = /signup/
const mockEmailInUseError = (): void => Http.mockForbiddenError(path, 'POST')
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
const mockOk = (): void => Http.mockOk(path, 'POST', 'fx:account')

const populateFields = (): void => {
  cy.getByTestId('name').focus().type(faker.name.findName())
  cy.getByTestId('email').focus().type(faker.internet.email())
  const password = faker.random.alphaNumeric(6)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('confirmPassword').focus().type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('name', 'Required field')
    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Required field')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Required field')
    cy.getByTestId('confirmPassword').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('confirmPassword', 'Required field')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName())
    FormHelper.testInputStatus('name', 'Invalid field value')
    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Invalid field value')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('password', 'Invalid field value')
    cy.getByTestId('confirmPassword').focus().type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('confirmPassword', 'Invalid field value')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName())
    FormHelper.testInputStatus('name')
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')
    const password = faker.random.alphaNumeric(6)
    cy.getByTestId('password').focus().type(password)
    FormHelper.testInputStatus('password')
    cy.getByTestId('confirmPassword').focus().type(password)
    FormHelper.testInputStatus('confirmPassword')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present EmailInUseError on 403', () => {
    mockEmailInUseError()
    simulateValidSubmit()
    FormHelper.testMainError('E-mail already in use')
    Helpers.testUrl('/signup')
  })

  it('should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Something wrong happened. Try again soon.')
    Helpers.testUrl('/signup')
  })

  it('should present save account if valid credentials are provided', () => {
    mockOk()
    simulateValidSubmit()
    cy.getByTestId('error-wrap').should('not.have.descendants')
    Helpers.testUrl('/')
    Helpers.testLocalStorageItem('@4Devs:account')
  })

  it('should prevent multiple submits', () => {
    mockOk()
    populateFields()
    cy.getByTestId('submit').dblclick()
    cy.wait('@request')
    Helpers.testHttpCallsCount(1)
  })

  it('should not call submit if form is invalid', () => {
    mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    Helpers.testHttpCallsCount(0)
  })
})
