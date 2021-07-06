import { atom } from 'recoil'
import { LoadSurveysList } from '@domain/usecases'

export const surveyListState = atom({
  key: 'surveyListState',
  default: {
    surveys: [] as LoadSurveysList.Model[],
    error: '',
    reload: false
  }
})
