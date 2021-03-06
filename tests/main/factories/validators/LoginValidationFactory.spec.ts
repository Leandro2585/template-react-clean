import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from '@validation/validators'
import { makeLoginValidation } from '@main/factories/validators'

describe('LoginValidationFactory', () => {
  test('should compose ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 6)
    ]))
  })
})
