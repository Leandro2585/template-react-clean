import { mockAccountModel } from '@domain/test'
import { LocalStorageAdapter } from '@infra/cache/LocalStorageAdapter'
import { setCurrentAccountAdapter } from './CurrentAccountAdapter'

jest.mock('@infra/cache/LocalStorageAdapter')

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('@4Devs:account', account)
  })
})
