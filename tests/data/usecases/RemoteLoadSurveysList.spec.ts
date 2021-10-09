import faker from 'faker'
import { HttpStatusCode } from '@data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { SurveyModel } from '@domain/models'
import { mockSurveysListModel } from '@tests/domain/mocks'
import { RemoteLoadSurveysList } from '@data/usecases/RemoteLoadSurveysList'
import { HttpClientSpy } from '@tests/data/mocks'

type SutTypes = {
  sut: RemoteLoadSurveysList;
  httpClientSpy: HttpClientSpy<SurveyModel[]>;
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<SurveyModel[]>()
  const sut = new RemoteLoadSurveysList(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadSurveysList', () => {
  test('should call HttpClient with correct url and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })

  test('should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return a list of SurveyModel if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockSurveysListModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const surveys = await sut.loadAll()
    expect(surveys).toEqual(httpResult)
  })

  test('should return an empty list if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }
    const surveys = await sut.loadAll()
    expect(surveys).toEqual([])
  })
})
