import * as Helper from '../utils/Helpers'
import * as Http from '../utils/HttpMocks'

const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockSuccess = (): void => Http.mockOk(path, 'GET', 'fx:survey-list')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('@4Devs:account', account)
    })
  })

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Something wrong happened. Try again soon.')
  })

  it('should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Something wrong happened. Try again soon.')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 2)
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

  it('should present survey items', () => {
    mockSuccess()
    cy.visit('')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="day"').text(), '03')
      assert.equal(li.find('[data-testid="month"').text(), 'fev')
      assert.equal(li.find('[data-testid="year"').text(), '2021')
      assert.equal(li.find('[data-testid="question"').text(), 'Question 1')
    })
    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="day"').text(), '20')
      assert.equal(li.find('[data-testid="month"').text(), 'out')
      assert.equal(li.find('[data-testid="year"').text(), '2021')
      assert.equal(li.find('[data-testid="question"').text(), 'Question 2')
    })
  })
})
