import faker from 'faker'
import * as Helper from './HttpMocks'

export const mockInvalidCredentialsError = (): void => {
  return Helper.mockInvalidCredentialsError(/login/)
}

export const mockUnexpectedError = (): void => {
  return Helper.mockUnexpectedError(/login/, 'POST')
}

export const mockOk = (): void => {
  return Helper.mockOk(/login/, 'POST', { accessToken: faker.datatype.uuid() })
}

export const mockInvalidData = (): void => {
  return Helper.mockOk(/login/, 'POST', { invalid: faker.datatype.uuid() })
}
