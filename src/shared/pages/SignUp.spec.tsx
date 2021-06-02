import React from 'react'
import faker from 'faker'
import SignUp from './SignUp'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { FormHelper, ValidationStub } from '@shared/test'

type SutTypes = {
  sut: RenderResult;
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <SignUp validation={validationStub}/>
  )
  return {
    sut
  }
}

const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()) => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

describe('SignUp Component', () => {
  afterEach(cleanup)
  test('should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    FormHelper.testChildCount(sut, 'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusForField(sut, 'name', validationError)
    FormHelper.testStatusForField(sut, 'email', 'Campo obrigatório')
    FormHelper.testStatusForField(sut, 'password', 'Campo obrigatório')
    FormHelper.testStatusForField(sut, 'confirmPassword', 'Campo obrigatório')
  })

  test('should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'name')
    FormHelper.testStatusForField(sut, 'name', validationError)
  })
})
