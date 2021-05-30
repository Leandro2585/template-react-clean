import faker from 'faker'
import { HttpPostClientSpy } from '@data/test'
import { AddAccount } from '@domain/usecases'
import { mockAddAccountParams } from '@domain/test'
import { RemoteAddAccount } from './RemoteAddAccount'

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccount.Params, AddAccount.Result>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccount.Params, AddAccount.Result>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    sut.create(mockAddAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })
})
