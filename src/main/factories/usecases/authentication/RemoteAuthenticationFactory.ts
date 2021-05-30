import { makeApiUrl, makeAxiosHttpClient } from '@main/factories/http'
import { RemoteAuthentication } from '@data/usecases/authentication/RemoteAuthentication'
import { Authentication } from '@domain/usecases'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}
