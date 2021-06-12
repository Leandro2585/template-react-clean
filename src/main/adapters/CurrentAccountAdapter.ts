import { makeLocalStorageAdapter } from '@main/factories/cache'
import { UnexpectedError } from '@domain/errors'
import { AccountModel } from '@domain/models'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdapter().set('@4Devs:account', account)
}
