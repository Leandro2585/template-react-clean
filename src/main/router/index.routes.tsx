import React from 'react'
import { RecoilRoot } from 'recoil'
import '@shared/styles/global.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from '@main/router/private/Private.routes'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@main/adapters'
import { makeLogin, makeSignUp, makeSurveyList, makeSurveyResult } from '@main/factories/pages'
import { ApiContext } from '@shared/contexts'

const Router: React.FC = () => {
  return (
    <RecoilRoot>
      <ApiContext.Provider
        value={{
          getCurrentAccount: getCurrentAccountAdapter,
          setCurrentAccount: setCurrentAccountAdapter
        }}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={makeLogin}/>
            <Route path="/signup" component={makeSignUp}/>
            <PrivateRoute path="/" component={makeSurveyList}/>
            <PrivateRoute path="/surveys/:id" component={makeSurveyResult}/>
          </Switch>
        </BrowserRouter>
      </ApiContext.Provider>
    </RecoilRoot>
  )
}

export default Router
