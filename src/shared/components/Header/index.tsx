import React, { memo } from 'react'
import { useRecoilValue } from 'recoil'
import { useLogout } from '@shared/hooks'
import { Logo } from '@shared/components'
import { currentAccountState } from '@shared/atoms'
import Styles from './style.scss'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const buttonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo/>
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" onClick={buttonClick} href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
