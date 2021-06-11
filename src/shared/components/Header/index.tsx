import React from 'react'
import { Logo } from '@shared/components'
import Styles from './style.scss'

const Header: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo/>
        <div className={Styles.logoutWrap}>
          <span>Leandro</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default Header
