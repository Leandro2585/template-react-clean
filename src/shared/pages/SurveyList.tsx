import React, { useEffect, useState } from 'react'
import { LoadSurveysList } from '@domain/usecases'
import { SurveyModel } from '@domain/models'
import { Header, SurveyItem, SurveyItemEmpty } from '@shared/components'
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
        {state.error
          ? <div>
              <span data-testid="error">
                {state.error}
              </span>
              <button>Recarregar</button>
            </div>
          : <ul>
              {state.surveys.length
                ? state.surveys.map((survey: SurveyModel) => {
                  return <SurveyItem key={survey.id} survey={survey}/>
                })
                : <SurveyItemEmpty/>
              }
            </ul>
        }

      </div>
    </div>
  )
}
export default SurveyList
