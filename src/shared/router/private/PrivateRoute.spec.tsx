import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './PrivateRoute'

type SutTypes = {
  history: MemoryHistory;
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <PrivateRoute/>
    </Router>
  )
  return { history }
}

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/login')
  })
})
