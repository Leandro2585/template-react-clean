import * as Helper from './HttpMocks'

export const mockEmailInUseError = (): void => {
  Helper.mockEmailInUseError(/signup/)
}
