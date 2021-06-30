import React from 'react'
import { SurveyResult } from "@shared/pages"
import { makeRemoteLoadSurveyResult } from '../usecases/RemoteLoadSurveyResultFactory'
import { useParams } from 'react-router-dom'

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams()
  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)}/>
}