import { mockAccountModel } from '@domain/test'
import { Authentication } from '@domain/usecases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: Authentication.Params
  callsCount = 0
  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
