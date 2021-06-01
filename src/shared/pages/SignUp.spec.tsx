import React from 'react'
import faker from 'faker'
import SignUp from './SignUp'
import { render, RenderResult } from '@testing-library/react'
import { FormHelper } from '@shared/test'

type SutTypes = {
  sut: RenderResult;
}

const makeSut = (): SutTypes => {
  const sut = render(<SignUp/>)
  return {
    sut
  }
}

describe('SignUp Component', () => {
  test('should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    FormHelper.testChildCount(sut, 'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusForField(sut, 'name', validationError)
    FormHelper.testStatusForField(sut, 'email', validationError)
    FormHelper.testStatusForField(sut, 'password', validationError)
    FormHelper.testStatusForField(sut, 'confirmPassword', validationError)
  })
})
