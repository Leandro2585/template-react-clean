import faker from 'faker'
import * as Http from './HttpMocks'

export const mockEmailInUseError = (): void => {
  Http.mockForbiddenError(/signup/, 'POST')
}

export const mockUnexpectedError = (): void => {
  return Http.mockServerError(/signup/, 'POST')
}

export const mockOk = (): void => {
  return Http.mockOk(/signup/, 'POST', {
    name: faker.name.findName(),
    accessToken: faker.datatype.uuid()
  })
}
