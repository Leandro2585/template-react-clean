import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ApiContext } from '@shared/contexts'
import { Logo } from '@shared/components'
import Styles from './style.scss'

const Header: React.FC = () => {
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    history.replace('/login')
  }
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo/>
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" onClick={logout} href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default Header
