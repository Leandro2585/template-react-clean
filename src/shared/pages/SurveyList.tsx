import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { LoadSurveysList } from '@domain/usecases'
import { useErrorHandler } from '@shared/hooks'
import { Header, SurveyListItem, Error } from '@shared/components'
import { surveyListState } from '@shared/atoms'
import Styles from '@shared/styles/surveylist.scss'

type Props = {
  loadSurveysList: LoadSurveysList;
}

const SurveyList: React.FC<Props> = ({ loadSurveysList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })
  const [state, setState] = useRecoilState(surveyListState)

  const reload = (): void => {
    setState(old => ({
      surveys: [],
      error: '',
      reload: !old.reload
    }))
  }
  useEffect(() => {
    loadSurveysList.loadAll()
      .then(surveys => setState((old) => ({ ...old, surveys })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header/>
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
          {state.error
            ? <Error error={state.error} reload={reload}/>
            : <SurveyListItem surveys={state.surveys}/>
          }
      </div>
    </div>
  )
}

export default SurveyList
