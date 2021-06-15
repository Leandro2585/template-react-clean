import * as Http from './HttpMocks'

export const mockUnexpectedError = (): void => Http.mockServerError(/surveys/, 'POST')
export const mockAccessDeniedError = (): void => Http.mockForbiddenError(/surveys/, 'GET')
