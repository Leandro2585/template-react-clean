import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { createMemoryHistory } from 'history'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { InvalidCredentialsError } from '@domain/errors'
import { AuthenticationSpy, ValidationStub, FormHelper } from '@shared/test'
import { Login } from '@shared/pages'
import { AccountModel } from '@domain/models'
import { currentAccountState } from '@shared/atoms'
import { mockAccountModel } from '@domain/test'

type SutTypes = {
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
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }

  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router history={history}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </Router>
    </RecoilRoot>
  )
  return { authenticationSpy, setCurrentAccountMock }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
}

describe('Login Component', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    FormHelper.testStatusForField('email', validationError)
    FormHelper.testStatusForField('password', validationError)
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    FormHelper.populateField('email')
    FormHelper.testStatusForField('email', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    FormHelper.populateField('password')
    FormHelper.testStatusForField('password', validationError)
  })

  test('should show valid email state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('email')
    FormHelper.testStatusForField('email')
  })

  test('should show valid password state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('password')
    FormHelper.testStatusForField('password')
  })

  test('should enable submit button if form is valid', () => {
    makeSut()
    FormHelper.populateField('email')
    FormHelper.populateField('password')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    const errorWrap = screen.getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    expect(screen.getByTestId('main-error').textContent).toBe(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('should call SetCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signup page', async () => {
    makeSut()
    const signUpLink = screen.getByTestId('signup-link')
    fireEvent.click(signUpLink)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
