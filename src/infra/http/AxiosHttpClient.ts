import axios, { AxiosResponse } from 'axios'
import { HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from '@data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async get (params: HttpGetParams): Promise<void> {
    await axios.get(params.url)
  }
}
