import { SaveAccessToken } from '@domain/usecases'
import { LocalSaveAccessToken } from '@data/usecases/saveaccesstoken/LocalSaveAccessToken'
import { makeLocalStorageAdapter } from '@main/factories/cache/LocalStorageAdapterFactory'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
