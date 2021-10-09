import { RemoteLoadSurveysList } from '@data/usecases/loadsurveyslist/RemoteLoadSurveysList'
import { LoadSurveysList } from '@domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '../decorators'
import { makeApiUrl } from '../http'

export const makeRemoteLoadSurveysList = (): LoadSurveysList => {
  return new RemoteLoadSurveysList(makeApiUrl('/surveys'), makeAuthorizeHttpClientDecorator())
}
