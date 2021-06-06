import { HttpGetClient } from '@data/protocols/http'

export class RemoteLoadSurveysList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async loadAll (): Promise<void> {
    await this.httpGetClient.get({ url: this.url })
  }
}
