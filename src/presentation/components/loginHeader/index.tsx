import React, { memo } from 'react'
import Logo from '../logo'
import styles from './style.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo/>
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  )
}

export default memo(LoginHeader)
