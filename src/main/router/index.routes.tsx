import '@shared/styles/global.scss'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SurveyList } from '@shared/pages'
import { makeLogin, makeSignUp } from '@main/factories/pages'
import { ApiContext } from '@shared/contexts'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@main/adapters'

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
          <Route path="/" component={SurveyList}/>
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
