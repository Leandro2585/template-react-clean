import { HttpClient, HttpStatusCode } from '@data/protocols/http'
import { LoadSurveysList } from '@domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { SurveyModel } from '@domain/models'

export class RemoteLoadSurveysList implements LoadSurveysList {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<SurveyModel[]>
  ) {}

  async loadAll (): Promise<LoadSurveysList.Model> {
    const httpResponse = await this.httpClient.request({ url: this.url, method: 'get' })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return []
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
