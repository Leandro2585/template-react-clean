import { mockAccountModel } from '@domain/test'
import { AddAccount } from '@domain/usecases'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccount.Params

  async create (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.account
  }
}
