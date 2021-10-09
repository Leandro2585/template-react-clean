import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentAccountState } from '@shared/atoms'
import { RouteProps, Redirect, Route } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  return getCurrentAccount()?.accessToken
    ? <Route {...props}/>
    : <Route {...props} component={() => <Redirect to="/login"/>}/>
}

export default PrivateRoute
