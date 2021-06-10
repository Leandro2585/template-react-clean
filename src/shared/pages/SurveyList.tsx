import React from 'react'
import Styles from '@shared/styles/surveylist.scss'
import { Footer, Logo } from '@shared/components'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo/>
          <div className={Styles.logoutWrap}>
            <span>Leandro</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>09</span>
                <span className={Styles.month}>03</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>Qual é sua linguagem de programação preferida?</p>
            </div>
            <Footer/>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default SurveyList
