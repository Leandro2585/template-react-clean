import React from 'react'
import { Login } from '@shared/pages'
import { RemoteAuthentication } from '@data/usecases/authentication/RemoteAuthentication'
import { AxiosHttpClient } from '@infra/http/AxiosHttpClient'
import { ValidationBuilder, ValidationComposite } from '@validation/validators'

export const makeLogin: React.FC = () => {
  const url = 'http://localhost:3333/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(6).build()
  ])
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
