import { InvalidFieldError } from '@validation/errors'
import { FieldValidation } from '@validation/protocols/FieldValidation'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}
  validate (value: string): Error {
    throw new InvalidFieldError()
  }
}
