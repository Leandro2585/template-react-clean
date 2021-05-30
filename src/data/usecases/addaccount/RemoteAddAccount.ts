import { HttpPostClient } from '@data/protocols/http'
import { AddAccount } from '@domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccount.Params, AddAccount.Result>
  ) {}

  async create (params: AddAccount.Params): Promise<AddAccount.Result> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    return null
  }
}
