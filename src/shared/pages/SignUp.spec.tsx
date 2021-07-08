import React from 'react'
import faker from 'faker'
import { RecoilRoot } from 'recoil'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { FormHelper, ValidationStub, AddAccountSpy } from '@shared/test'
import { EmailInUseError } from '@domain/errors'
import { AccountModel } from '@domain/models'
import { SignUp } from '@shared/pages'
import { currentAccountState } from '@shared/atoms'
import { mockAccountModel } from '@domain/test'

type SutTypes = {
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock(account: AccountModel): void;
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }
  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router history={history}>
        <SignUp
          validation={validationStub}
          addAccount={addAccountSpy}
        />
      </Router>
    </RecoilRoot>
  )
  return { addAccountSpy, setCurrentAccountMock }
}

const simulateValidSubmit = async (name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
}

describe('SignUp Component', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    FormHelper.testStatusForField('name', validationError)
    FormHelper.testStatusForField('email', validationError)
    FormHelper.testStatusForField('password', validationError)
    FormHelper.testStatusForField('confirmPassword', validationError)
  })

  test('should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    FormHelper.populateField('name')
    FormHelper.testStatusForField('name', validationError)
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

  test('should show confirmPassword error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    FormHelper.populateField('confirmPassword')
    FormHelper.testStatusForField('confirmPassword', validationError)
  })

  test('should show valid name state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('name')
    FormHelper.testStatusForField('name')
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

  test('should show valid confirmPassword state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('confirmPassword')
    FormHelper.testStatusForField('confirmPassword')
  })

  test('should enable submit button if form is valid', () => {
    makeSut()
    FormHelper.populateField('name')
    FormHelper.populateField('email')
    FormHelper.populateField('password')
    FormHelper.populateField('confirmPassword')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password(6)
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      confirmPassword: password
    })
  })

  test('should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'create').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('should call SetCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to login page', () => {
    makeSut()
    const loginLink = screen.getByTestId('login-link')
    fireEvent.click(loginLink)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
