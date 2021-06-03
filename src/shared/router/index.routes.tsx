import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@shared/styles/global.scss'

type Factory = {
  makeLogin: React.FC;
  makeSignUp: React.FC;
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={factory.makeLogin}/>
        <Route path="/signup" component={factory.makeSignUp}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
