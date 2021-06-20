import React, { useState } from 'react'
import FlipMove from 'react-flip-move'
import { LoadSurveyResult } from '@domain/usecases'
import { Calendar, Header, Loading, Error } from '@shared/components'
import Styles from '@shared/styles/surveyresult.scss'

const SurveyResult: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })
  return (
    <div className={Styles.surveyResultWrap}>
      <Header/>
      <div data-testid="survey-result" className={Styles.contentWrap}>
      { false &&
      <>
        <hgroup>
          <Calendar date={new Date()} className={Styles.calendarWrap}/>
          <h2>Qual é seu framework web favorito</h2>
        </hgroup>
        <FlipMove className={Styles.answersList}>
          <li>
            <img src="http://fordevs.herokuapp.com/static/img/logo-react.png"/>
            <span className={Styles.answer}>ReactJS</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        { state.isLoading && <Loading/>}
        { state.error && <Error error={state.error} reload={() => {}}/>}
      </>}
      </div>
    </div>
  )
}

export default SurveyResult
