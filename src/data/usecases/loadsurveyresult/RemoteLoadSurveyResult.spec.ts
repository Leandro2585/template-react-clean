import faker from 'faker'
import { HttpGetClientSpy } from '@data/test'
import { RemoteLoadSurveyResult } from './RemoteLoadSurveyResult'

describe('RemoteLoadSurveyResult', () => {
  test('should call HttpGetClient woth correct url', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
