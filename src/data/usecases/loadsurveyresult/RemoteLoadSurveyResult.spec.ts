import faker from 'faker'
import { HttpGetClientSpy } from '@data/test'
import { RemoteLoadSurveyResult } from './RemoteLoadSurveyResult'

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpGetClientSpy: HttpGetClientSpy;
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
  return { sut, httpGetClientSpy }
}

describe('RemoteLoadSurveyResult', () => {
  test('should call HttpGetClient woth correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
