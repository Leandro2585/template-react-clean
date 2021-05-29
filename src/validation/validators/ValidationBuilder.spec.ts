import { RequiredFieldValidation } from './RequiredFieldValidation'
import { ValidationBuilder as sut } from './ValidationBuilder'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})
