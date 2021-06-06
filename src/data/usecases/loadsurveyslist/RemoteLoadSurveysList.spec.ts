import faker from 'faker'
import { HttpGetClientSpy } from '@data/test'
import { RemoteLoadSurveysList } from './RemoteLoadSurveysList'

describe('RemoteLoadSurveysList', () => {
  test('should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveysList(url, httpGetClientSpy)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
