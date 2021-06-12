import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { ApiContext } from '@shared/contexts'
import { InvalidCredentialsError } from '@domain/errors'
import { AuthenticationSpy, ValidationStub, FormHelper } from '@shared/test'
import { Login } from '@shared/pages'
import { AccountModel } from '@domain/models'

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock(account: AccountModel): void;
}

type SutParams = {
  validationError: string;
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  return { sut, authenticationSpy, setCurrentAccountMock }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  FormHelper.populateField(sut, 'email', email)
  FormHelper.populateField(sut, 'password', password)
  const submit = sut.getByTestId('submit')
  fireEvent.click(submit)
}

describe('Login Component', () => {
  afterEach(cleanup)
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.testChildCount(sut, 'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusForField(sut, 'email', validationError)
    FormHelper.testStatusForField(sut, 'password', validationError)
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'email')
    FormHelper.testStatusForField(sut, 'email', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'password')
    FormHelper.testStatusForField(sut, 'password', validationError)
  })

  test('should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut, 'email')
    FormHelper.testStatusForField(sut, 'email')
  })

  test('should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut, 'password')
    FormHelper.testStatusForField(sut, 'password')
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut, 'email')
    FormHelper.populateField(sut, 'password')
    FormHelper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    FormHelper.testElementExists(sut, 'spinner')
  })

  test('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    simulateValidSubmit(sut)
    const errorWrap = sut.getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    FormHelper.testElementText(sut, 'main-error', error.message)
    FormHelper.testChildCount(sut, 'error-wrap', 1)
  })

  test('should call SetCurrentAccount on success', async () => {
    const { sut, authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signup page', async () => {
    const { sut } = makeSut()
    const signUpLink = sut.getByTestId('signup-link')
    fireEvent.click(signUpLink)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
