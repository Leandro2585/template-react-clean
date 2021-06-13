import 'jest-localstorage-mock'
import faker from 'faker'
import { AccountModel } from '@domain/models'
import { LocalStorageAdapter } from './LocalStorageAdapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()
describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should call localStorage.setItem with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('should call localStorage.removeItem if value is null', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    sut.set(key, undefined)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })

  test('should call localStorage.getItem with correct value', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
