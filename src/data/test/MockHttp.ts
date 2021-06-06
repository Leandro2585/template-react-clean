import {
  HttpResponse,
  HttpStatusCode,
  HttpPostClient,
  HttpPostParams,
  HttpGetParams,
  HttpGetClient
} from '@data/protocols/http'
import faker from 'faker'

export class HttpPostClientSpy<Body, Response> implements HttpPostClient<Body, Response> {
  url?: string;

  body?: Body;

  response: HttpResponse<Response> = {
    statusCode: HttpStatusCode.ok
  };

  async post (params: HttpPostParams<Body>): Promise<HttpResponse<Response>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}

export class HttpGetClientSpy implements HttpGetClient {
  url: string;
  async get (params: HttpGetParams): Promise<void> {
    this.url = params.url
  }
}

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
