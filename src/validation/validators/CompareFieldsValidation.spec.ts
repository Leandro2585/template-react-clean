import { InvalidFieldError } from '@validation/errors'
import faker from 'faker'
import { CompareFieldsValidation } from './CompareFieldsValidation'

const makeSut = (valueToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(
    faker.database.column(),
    valueToCompare
  )
}
describe('CompareFieldsValidation', () => {
  test('should returnn error if compare is invalid', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', () => {
    const valueToCompare = faker.random.word()
    const sut = makeSut(valueToCompare)
    const error = sut.validate(valueToCompare)
    expect(error).toBeFalsy()
  })
})
