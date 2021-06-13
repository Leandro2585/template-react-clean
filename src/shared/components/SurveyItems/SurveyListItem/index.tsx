import React, { useContext } from 'react'
import { SurveyModel } from '@domain/models'
import { SurveyContext } from '@shared/contexts'
import { SurveyItem, SurveyItemEmpty } from '@shared/components'
import Styles from './style.scss'

const SurveyListItem: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={Styles.listWrap}>
      {state.surveys.length
        ? state.surveys.map((survey: SurveyModel) => {
          return <SurveyItem key={survey.id} survey={survey}/>
        })
        : <SurveyItemEmpty/>
      }
    </ul>
  )
}

export default SurveyListItem
