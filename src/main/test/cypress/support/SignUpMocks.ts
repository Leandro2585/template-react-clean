import faker from 'faker'
import * as Helper from './HttpMocks'

export const mockEmailInUseError = (): void => {
  Helper.mockEmailInUseError(/signup/)
}

export const mockUnexpectedError = (): void => {
  return Helper.mockUnexpectedError(/signup/, 'POST')
}

export const mockInvalidData = (): void => {
  return Helper.mockOk(/signup/, 'POST', { invalid: faker.datatype.uuid() })
}
