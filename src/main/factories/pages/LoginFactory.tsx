import React from 'react'
import { Login } from '@shared/pages'
import { makeRemoteAuthentication } from '@main/factories/usecases/authentication/RemoteAuthenticationFactory'
import { makeLocalSaveAccessToken } from '@main/factories/usecases/saveaccesstoken/LocalSaveAccessTokenFactory'
import { makeLoginValidation } from './LoginValidationFactory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      saveAccessToken={makeLocalSaveAccessToken()}
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
