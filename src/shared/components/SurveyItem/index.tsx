import React from 'react'
import { SurveyModel } from '@domain/models'
import { Footer } from '..'
import SurveyItemEmpty from './SurveyItemEmpty'
import Styles from './style.scss'

type Props = {
  survey: SurveyModel;
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <time>
          <span
            data-testid="day"
            className={Styles.day}>
            {survey.date.getDate()}
          </span>
          <span
            data-testid="month"
            className={Styles.month}>
            {
              survey.date
                .toLocaleString('pt-BR', { month: 'short' })
                .replace('.', '')
            }
          </span>
          <span
            data-testid="year"
            className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">
          {survey.question}
        </p>
      </div>
      <Footer/>
    </li>
  )
}

export { SurveyItem, SurveyItemEmpty }
