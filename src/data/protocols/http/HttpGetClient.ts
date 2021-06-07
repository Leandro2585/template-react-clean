import { HttpResponse } from './HttpResponse'

export type HttpGetParams = {
  url: string;
}

export interface HttpGetClient<Response = any> {
  get(params: HttpGetParams): Promise<HttpResponse<Response>>
}
