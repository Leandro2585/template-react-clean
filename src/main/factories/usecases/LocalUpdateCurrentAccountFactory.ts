import { UpdateCurrentAccount } from '@domain/usecases'
import { LocalUpdateCurrentAccount } from '@data/usecases/updatecurrentaccount/LocalUpdateCurrentAccount'
import { makeLocalStorageAdapter } from '@main/factories/cache/LocalStorageAdapterFactory'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}
