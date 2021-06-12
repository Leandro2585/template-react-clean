import React from 'react'
import { Login } from '@shared/pages'
import { makeRemoteAuthentication } from '@main/factories/usecases'
import { makeLoginValidation } from '@main/factories/validators'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
