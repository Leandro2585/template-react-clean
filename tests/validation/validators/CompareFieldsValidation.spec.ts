import faker from 'faker'
import { InvalidFieldError } from '@validation/errors'
import { CompareFieldsValidation } from '@validation/validators'

const makeSut = (field: string, fieldToCompare): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}
describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const field = 'any_field'
    const fieldToCompare = 'other_field'
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value'
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', () => {
    const field = 'any_field'
    const fieldToCompare = 'other_field'
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
