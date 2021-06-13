import React from 'react'
import { SurveyList } from '@shared/pages'
import { makeRemoteLoadSurveysList } from '@main/factories/usecases'

export const makeSurveyList: React.FC = () => {
  return (
    <SurveyList loadSurveysList={makeRemoteLoadSurveysList()}/>
  )
}
