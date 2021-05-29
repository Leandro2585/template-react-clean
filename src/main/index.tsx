import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@shared/router/index.routes'
import { makeLogin } from '@main/factories/pages/LoginFactory'

ReactDOM.render(
  <Router makeLogin={makeLogin}/>,
  document.getElementById('main')
)
