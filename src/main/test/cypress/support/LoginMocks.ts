import faker from 'faker'
import * as Http from './HttpMocks'

export const mockInvalidCredentialsError = (): void => {
  return Http.mockUnauthorizedError(/login/)
}

export const mockUnexpectedError = (): void => {
  return Http.mockServerError(/login/, 'POST')
}

export const mockOk = (): void => {
  return Http.mockOk(/login/, 'POST', {
    name: faker.name.findName(),
    accessToken: faker.datatype.uuid()
  })
}
