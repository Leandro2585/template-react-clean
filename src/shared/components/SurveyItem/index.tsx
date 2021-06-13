import React from 'react'
import { Footer } from '..'
import SurveyItemEmpty from './SurveyItemEmpty'
import Styles from './style.scss'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
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
  )
}

export { SurveyItem, SurveyItemEmpty }
