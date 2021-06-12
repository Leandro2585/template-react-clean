import { HttpPostClient, HttpStatusCode } from '@data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@domain/errors'
import { AddAccount } from '@domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccount.Params, AddAccount.Model>
  ) {}

  async create (params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body

      case HttpStatusCode.forbidden:
        throw new EmailInUseError()

      default:
        throw new UnexpectedError()
    }
  }
}
