import React from 'react'
import { RecoilRoot } from 'recoil'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { mockAccountModel } from '@domain/test'
import PrivateRoute from './Private.routes'
import { currentAccountState } from '@shared/atoms'

type SutTypes = {
  history: MemoryHistory;
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const mockedState = { setCurrentAccount: jest.fn(), getCurrentAccount: () => account }

  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router history={history}>
        <PrivateRoute/>
      </Router>
    </RecoilRoot>
  )
  return { history }
}
