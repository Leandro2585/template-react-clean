import {
  HttpResponse,
  HttpStatusCode,
  HttpPostClient,
  HttpPostParams,
  HttpGetParams,
  HttpGetClient
} from '@data/protocols/http'
import faker from 'faker'

export class HttpPostClientSpy<Body = any, Response = any> implements HttpPostClient<Body, Response> {
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

export class HttpGetClientSpy<Response = any> implements HttpGetClient<Response> {
  url: string;
  headers?: any;
  response: HttpResponse<Response> = {
    statusCode: HttpStatusCode.ok
  };

  async get (params: HttpGetParams): Promise<HttpResponse<Response>> {
    this.url = params.url
    this.headers = params.headers
    return this.response
  }
}

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement()
})
