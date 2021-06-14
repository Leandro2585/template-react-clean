import React from 'react'
import { createMemoryHistory } from 'history'
import { fireEvent, screen, render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { ApiContext } from '@shared/contexts'
import { Header } from '@shared/components'

describe('', () => {
  test('should call setCurrentAccount with null', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: null }}>
        <Router history={history}>
          <Header/>
        </Router>
      </ApiContext.Provider>
    )
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
