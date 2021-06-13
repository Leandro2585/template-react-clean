import React, { useEffect } from 'react'
import { LoadSurveysList } from '@domain/usecases'
import { Header, SurveyItemEmpty } from '@shared/components'
import Styles from '@shared/styles/surveylist.scss'

type Props = {
  loadSurveysList: LoadSurveysList;
}

const SurveyList: React.FC<Props> = ({ loadSurveysList }: Props) => {
  useEffect(() => {
    (async function () {
      loadSurveysList.loadAll()
    })()
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header/>
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <SurveyItemEmpty/>
        </ul>
      </div>
    </div>
  )
}
export default SurveyList
