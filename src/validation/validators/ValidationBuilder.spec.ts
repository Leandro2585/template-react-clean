import { RequiredFieldValidation, EmailValidation } from '@validation/validators'
import { MinLengthValidation } from './MinLengthValidation'
import { ValidationBuilder as sut } from './ValidationBuilder'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('should return EmailValidation', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  test('shoul return MinLengthValidation', () => {
    const validations = sut.field('any_field').min(5).build()
    expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
  })
})
