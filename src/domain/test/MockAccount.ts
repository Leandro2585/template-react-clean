import { AddAccount, Authentication } from '@domain/usecases'
import faker from 'faker'

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password
  }
}

export const mockAccountModel = (): Authentication.Result => ({
  accessToken: faker.datatype.uuid()
})
