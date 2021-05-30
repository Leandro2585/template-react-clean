import { SetStorage } from '@data/protocols/cache'
import { LocalStorageAdapter } from '@infra/cache/LocalStorageAdapter'

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
