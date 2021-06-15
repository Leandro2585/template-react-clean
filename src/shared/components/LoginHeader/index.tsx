import React, { memo } from 'react'
import { Logo } from '@shared/components'
import Styles from './style.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo/>
      <h1>Login System</h1>
    </header>
  )
}

export default memo(LoginHeader)
