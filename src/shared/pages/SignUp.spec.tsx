import React from 'react'
import faker from 'faker'
import SignUp from './SignUp'
import { render, RenderResult } from '@testing-library/react'

type SutTypes = {
  sut: RenderResult;
}

const makeSut = (): SutTypes => {
  const sut = render(<SignUp/>)
  return {
    sut
  }
}

const testChildCount = (sut: RenderResult, field: string, count: number): void => {
  const errorWrap = sut.getByTestId(field)
  expect(errorWrap.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError: string) => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🔵')
}

describe('SignUp Component', () => {
  test('should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    testChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'confirmPassword', validationError)
  })
})
