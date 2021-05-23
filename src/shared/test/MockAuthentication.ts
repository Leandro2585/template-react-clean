import { mockAccountModel } from '@domain/test'
import { Authentication } from '@domain/usecases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: Authentication.Params
  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return Promise.resolve(this.account)
  }
}
