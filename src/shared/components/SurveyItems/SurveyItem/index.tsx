import React from 'react'
import { SurveyModel } from '@domain/models'
import { Footer, Calendar } from '@shared/components'
import Styles from './style.scss'

type Props = {
  survey: SurveyModel;
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Calendar date={survey.date} className={Styles.calendarWrap}/>
        <p data-testid="question">
          {survey.question}
        </p>
      </div>
      <Footer/>
    </li>
  )
}

export default SurveyItem
