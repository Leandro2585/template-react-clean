import faker from 'faker'
import { LocalSaveAccessToken } from './LocalSaveAccessToken'
import { SetStorageSpy } from '@data/test/MockStorage'

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
