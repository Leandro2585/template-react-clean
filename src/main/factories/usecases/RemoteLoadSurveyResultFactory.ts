import { RemoteLoadSurveyResult } from '@data/usecases/loadsurveyresult/RemoteLoadSurveyResult'
import { LoadSurveyResult } from '@domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '../decorators'
import { makeApiUrl } from '../http'

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator())
}
