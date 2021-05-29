import React from 'react'
import { Login } from '@shared/pages'
import { makeRemoteAuthentication } from '../usecases/authentication/RemoteAuthenticationFactory'
import { makeLoginValidation } from './LoginValidationFactory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
