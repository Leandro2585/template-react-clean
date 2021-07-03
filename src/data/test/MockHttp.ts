import {
  HttpResponse,
  HttpStatusCode,
  HttpClient,
  HttpRequest
} from '@data/protocols/http'
import faker from 'faker'

export class HttpClientSpy<Response = any> implements HttpClient<Response> {
  url?: string;
  body?: any;
  headers?: any;
  method?: string;
  response: HttpResponse<Response> = {
    statusCode: HttpStatusCode.ok
  };

  async request (data: HttpRequest): Promise<HttpResponse<Response>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    return this.response
  }
}

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete'])
})
