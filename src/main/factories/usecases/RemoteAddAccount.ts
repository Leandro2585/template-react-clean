import { RemoteAddAccount } from '@data/usecases/RemoteAddAccount'
import { AddAccount } from '@domain/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '../http'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
