import { HttpResponse } from '.'

export type HttpPostParams<Body> = {
  url: string;
  body?: Body;
};

export interface HttpPostClient<Body, Response> {
  post(params: HttpPostParams<Body>): Promise<HttpResponse<Response>>;
}
