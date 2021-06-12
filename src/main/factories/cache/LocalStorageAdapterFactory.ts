import { LocalStorageAdapter } from '@infra/cache/LocalStorageAdapter'

export const makeLocalStorageAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
