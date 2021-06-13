import React from 'react'
import Styles from '@shared/styles/surveylist.scss'
import { Header, SurveyItemEmpty } from '@shared/components'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header/>
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <SurveyItemEmpty/>
        </ul>
      </div>
    </div>
  )
}
export default SurveyList
