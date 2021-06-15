import faker from 'faker'
import * as Helper from '../support/Helpers'
import * as Http from '../support/SurveyListMocks'

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('@4Devs:account', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })
  })

  it('should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('container.text', 'Something wrong happened. Try again soon.')
  })
})