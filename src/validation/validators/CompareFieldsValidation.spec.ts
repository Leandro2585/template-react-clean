import faker from 'faker'
import { CompareFieldsValidation } from './CompareFieldsValidation'

const makeSut = (fieldToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(
    faker.database.column(),
    fieldToCompare
  )
}
describe('CompareFieldsValidation', () => {
  test('should returnn error if compare is invalid', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate('')
  })
})
