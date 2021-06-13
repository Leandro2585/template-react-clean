import React, { useEffect, useState } from 'react'
import { LoadSurveysList } from '@domain/usecases'
import { SurveyModel } from '@domain/models'
import { Header, SurveyError, SurveyListItem } from '@shared/components'
import { SurveyContext } from '@shared/contexts'
import Styles from '@shared/styles/surveylist.scss'

type Props = {
  loadSurveysList: LoadSurveysList;
}

const SurveyList: React.FC<Props> = ({ loadSurveysList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })
  useEffect(() => {
    loadSurveysList.loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(error => setState({ ...state, error: error.message }))
  }, [])

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
