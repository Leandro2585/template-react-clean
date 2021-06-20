import React, { useEffect, useState } from 'react'
import { LoadSurveysList } from '@domain/usecases'
import { SurveyModel } from '@domain/models'
import { useErrorHandler } from '@shared/hooks'
import { Header, SurveyListItem, Error } from '@shared/components'
import Styles from '@shared/styles/surveylist.scss'

type Props = {
  loadSurveysList: LoadSurveysList;
}

const SurveyList: React.FC<Props> = ({ loadSurveysList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    reload: false,
    error: ''
  })

  const reload = (): void => {
    setState(old => ({
      surveys: [],
      error: '',
      reload: !old.reload
    }))
  }
  useEffect(() => {
    loadSurveysList.loadAll()
      .then(surveys => setState(old => ({ ...old, surveys })))
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
