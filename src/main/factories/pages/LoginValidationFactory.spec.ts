import { ValidationBuilder, ValidationComposite } from '@validation/validators'
import { makeLoginValidation } from './LoginValidationFactory'

describe('LoginValidationFactory', () => {
  test('should compose ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(6).build()
    ]))
  })
})
