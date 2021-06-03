import { ValidationBuilder, ValidationComposite } from '@validation/validators'
import { makeSignUpValidation } from './SignUpValidationFactory'

describe('SignUpValidationFactory', () => {
  test('should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('name').required().build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(6).build(),
      ...ValidationBuilder.field('confirmPassword').required().min(6).sameAs('password').build()
    ]))
  })
})
