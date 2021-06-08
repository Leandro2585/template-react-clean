import { HttpGetClient, HttpStatusCode } from '@data/protocols/http'
import { LoadSurveysList } from '@domain/usecases/LoadSurveysList'
import { UnexpectedError } from '@domain/errors'
import { SurveyModel } from '@domain/models'

export class RemoteLoadSurveysList implements LoadSurveysList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  async loadAll (): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}
