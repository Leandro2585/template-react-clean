import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { ApiContext } from '@shared/contexts'
import { mockAccountModel } from '@domain/test'
import PrivateRoute from './Private.routes'

type SutTypes = {
  history: MemoryHistory;
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <ApiContext.Provider value={{
      getCurrentAccount: () => account,
      setCurrentAccount: () => null
    }}>
      <Router history={history}>
        <PrivateRoute/>
      </Router>
    </ApiContext.Provider>
  )
  return { history }
}

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('should render current component if token is not empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})

