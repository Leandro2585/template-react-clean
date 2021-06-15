import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { LoadSurveysList } from '@domain/usecases'
import { AccessDeniedError } from '@domain/errors'
import { SurveyModel } from '@domain/models'
import { Header, SurveyError, SurveyListItem } from '@shared/components'
import { SurveyContext, ApiContext } from '@shared/contexts'
import Styles from '@shared/styles/surveylist.scss'

type Props = {
  loadSurveysList: LoadSurveysList;
}

const SurveyList: React.FC<Props> = ({ loadSurveysList }: Props) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    reload: false,
    error: ''
  })
  useEffect(() => {
    loadSurveysList.loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(error => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          history.replace('/login')
        } else {
          setState({ ...state, error: error.message })
        }
      })
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
