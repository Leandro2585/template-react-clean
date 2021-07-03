import faker from 'faker'
import { AddAccount } from '@domain/usecases'
import { mockAccountModel, mockAddAccountParams } from '@domain/test'
import { EmailInUseError, UnexpectedError } from '@domain/errors'
import { HttpStatusCode } from '@data/protocols/http'
import { HttpClientSpy } from '@data/test'
import { RemoteAddAccount } from './RemoteAddAccount'

type SutTypes = {
  sut: RemoteAddAccount;
  httpClientSpy: HttpClientSpy<RemoteAddAccount.Model>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddAccount.Model>()
  const sut = new RemoteAddAccount(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('should call HttpClient with correct url and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.create(mockAddAccountParams())
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
  })

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpClientSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.create(addAccountParams)
    expect(httpClientSpy.body).toEqual(addAccountParams)
  })

  test('should call EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.create(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('should call UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.create(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should call UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.create(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should call UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.create(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.create(mockAddAccountParams())
    expect(account).toEqual(httpResult)
  })
})
