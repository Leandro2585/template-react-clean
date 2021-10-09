import { mockAccountModel } from '@tests/domain/mocks'
import { LocalStorageAdapter } from '@infra/cache/LocalStorageAdapter'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@main/adapters/CurrentAccountAdapter'

jest.mock('@infra/cache/LocalStorageAdapter')

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('@4Devs:account', account)
  })

  test('should call LocalStorageAdapter.get with correct values', () => {
    const account = mockAccountModel()
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account)
    const result = getCurrentAccountAdapter()
    expect(getSpy).toHaveBeenCalledWith('@4Devs:account')
    expect(result).toEqual(account)
  })
})
