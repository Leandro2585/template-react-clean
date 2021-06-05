import * as Helper from './HttpMocks'

export const mockEmailInUseError = (): void => {
  Helper.mockEmailInUseError(/signup/)
}

export const mockUnexpectedError = (): void => {
  return Helper.mockUnexpectedError(/signup/, 'POST')
}
