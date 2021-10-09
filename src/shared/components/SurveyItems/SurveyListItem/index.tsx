import React from 'react'
import { SurveyModel } from '@domain/models'
import { SurveyItem, SurveyItemEmpty } from '@shared/components'
import Styles from './style.scss'
import { LoadSurveysList } from '@domain/usecases'

type Props = {
  surveys: LoadSurveysList.Model[];
}

const SurveyListItem: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {surveys.length
        ? surveys.map((survey: SurveyModel) => (<SurveyItem key={survey.id} survey={survey}/>))
        : <SurveyItemEmpty/>
      }
    </ul>
  )
}

export default SurveyListItem
