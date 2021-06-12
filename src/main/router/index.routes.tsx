import '@shared/styles/global.scss'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@main/adapters'
import { makeLogin, makeSignUp } from '@main/factories/pages'
import { PrivateRoute } from '@main/router/private'
import { ApiContext } from '@shared/contexts'
import { SurveyList } from '@shared/pages'

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
          <PrivateRoute path="/" component={SurveyList}/>
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
