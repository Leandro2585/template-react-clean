import React from 'react'
import { RecoilRoot } from 'recoil'
import '@shared/styles/global.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from '@main/router/private/Private.routes'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@main/adapters'
import { makeLogin, makeSignUp, makeSurveyList, makeSurveyResult } from '@main/factories/pages'
import { currentAccountState } from '@shared/atoms'

const Router: React.FC = () => {
  const state = {
    getCurrentAccount: getCurrentAccountAdapter,
    setCurrentAccount: setCurrentAccountAdapter
  }
  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={makeLogin}/>
            <Route path="/signup" component={makeSignUp}/>
            <PrivateRoute path="/" component={makeSurveyList}/>
            <PrivateRoute path="/surveys/:id" component={makeSurveyResult}/>
          </Switch>
        </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router
