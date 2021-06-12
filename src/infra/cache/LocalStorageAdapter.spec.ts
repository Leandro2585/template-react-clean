import 'jest-localstorage-mock'
import faker from 'faker'
import { AccountModel } from '@domain/models'
import { LocalStorageAdapter } from './LocalStorageAdapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()
describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should call LocalStorage with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})
