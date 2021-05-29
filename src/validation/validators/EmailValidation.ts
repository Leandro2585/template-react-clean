import { InvalidFieldError } from '@validation/errors'
import { FieldValidation } from '@validation/protocols/FieldValidation'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}
  validate (value: string): Error {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

    return emailRegex.test(value) ? null : new InvalidFieldError()
  }
}
