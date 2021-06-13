import '@shared/styles/global.scss'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from '@main/router/private/Private.routes'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@main/adapters'
import { makeLogin, makeSignUp, makeSurveyList } from '@main/factories/pages'
import { ApiContext } from '@shared/contexts'

const Router: React.FC = () => {
  return (
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
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
