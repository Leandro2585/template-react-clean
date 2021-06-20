import React, { useEffect, useState, useContext } from 'react'
import { LoadSurveysList } from '@domain/usecases'
import { SurveyModel } from '@domain/models'
import { useErrorHandler } from '@shared/hooks'
import { Header, SurveyError, SurveyListItem } from '@shared/components'
import { SurveyContext } from '@shared/contexts'
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
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <SurveyError/> : <SurveyListItem/>}
        </SurveyContext.Provider>
      </div>
    </div>
  )
}

export default SurveyList
