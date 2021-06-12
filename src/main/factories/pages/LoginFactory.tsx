import React from 'react'
import { Login } from '@shared/pages'
import { makeRemoteAuthentication, makeLocalUpdateCurrentAccount } from '@main/factories/usecases'
import { makeLoginValidation } from '@main/factories/validators'

export const makeLogin: React.FC = () => {
  return (
    <Login
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
