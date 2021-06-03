import { RemoteAddAccount } from '@data/usecases/addaccount/RemoteAddAccount'
import { AddAccount } from '@domain/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '../http'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
