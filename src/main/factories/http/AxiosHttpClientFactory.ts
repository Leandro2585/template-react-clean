import { AxiosHttpClient } from '@infra/http/AxiosHttpClient'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
