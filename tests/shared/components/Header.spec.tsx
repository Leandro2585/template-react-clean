import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, screen, render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '@domain/models'
import { Header } from '@shared/components'
import { mockAccountModel } from '@tests/domain/mocks'
import { RecoilRoot } from 'recoil'
import { currentAccountState } from '@shared/atoms'

type SutTypes = {
  history: MemoryHistory;
  setCurrentAccountMock(account: AccountModel): void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }
  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router history={history}>
        <Header/>
      </Router>
    </RecoilRoot>
  )
  return { history, setCurrentAccountMock }
}

describe('', () => {
  test('should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
