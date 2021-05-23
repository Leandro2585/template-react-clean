import { HttpStatusCode, HttpPostClient } from '@data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@domain/errors'
import { AccountModel } from '@domain/models'
import { Authentication } from '@domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<Authentication.Params, Authentication.Result>
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body

      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()

      default:
        throw new UnexpectedError()
    }
  }
}
