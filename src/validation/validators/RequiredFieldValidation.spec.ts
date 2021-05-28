import { RequiredFieldError } from '@validation/errors'
import { RequiredFieldValidation } from './RequiredFieldValidation'

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
