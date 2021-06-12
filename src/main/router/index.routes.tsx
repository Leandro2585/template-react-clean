import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@shared/styles/global.scss'
import { SurveyList } from '@shared/pages'
import { makeLogin, makeSignUp } from '@main/factories/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={makeLogin}/>
        <Route path="/signup" component={makeSignUp}/>
        <Route path="/" component={SurveyList}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
