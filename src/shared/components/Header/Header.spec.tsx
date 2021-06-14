import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, screen, render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '@domain/models'
import { ApiContext } from '@shared/contexts'
import { Header } from '@shared/components'
import { mockAccountModel } from '@domain/test'

type SutTypes = {
  history: MemoryHistory;
  setCurrentAccountMock(account: AccountModel): void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }}>
      <Router history={history}>
        <Header/>
      </Router>
    </ApiContext.Provider>
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
