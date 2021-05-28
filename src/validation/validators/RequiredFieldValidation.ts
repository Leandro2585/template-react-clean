import { FieldValidation } from '@validation/protocols/FieldValidation'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}
  validate (value: string): Error {
    return new RequiredFieldError()
  }
}
