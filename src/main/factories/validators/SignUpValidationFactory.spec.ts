import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from '@validation/validators'
import { CompareFieldsValidation } from '@validation/validators/CompareFieldsValidation'
import { makeSignUpValidation } from './SignUpValidationFactory'

describe('SignUpValidationFactory', () => {
  test('should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('name'),
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 6),
      new RequiredFieldValidation('confirmPassword'),
      new MinLengthValidation('confirmPassword', 6),
      new CompareFieldsValidation('confirmPassword', 'password')
    ]))
  })
})
