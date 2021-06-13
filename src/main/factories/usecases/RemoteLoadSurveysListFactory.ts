import { RemoteLoadSurveysList } from '@data/usecases/loadsurveyslist/RemoteLoadSurveysList'
import { LoadSurveysList } from '@domain/usecases'
import { makeAuthorizeHttpGetClientDecorator } from '../decorators'
import { makeApiUrl, makeAxiosHttpClient } from '../http'

export const makeRemoteLoadSurveysList = (): LoadSurveysList => {
  return new RemoteLoadSurveysList(makeApiUrl('/surveys'), makeAuthorizeHttpGetClientDecorator())
}
