import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import { LoadSurveyResult } from '@domain/usecases'
import { Calendar, Header, Loading, Error } from '@shared/components'
import Styles from '@shared/styles/surveyresult.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult;
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({...old, surveyResult })))
      .catch()
  }, [])
  return (
    <div className={Styles.surveyResultWrap}>
      <Header/>
      <div data-testid="survey-result" className={Styles.contentWrap}>
      { false &&
      <>
        <hgroup>
          <Calendar date={new Date()} className={Styles.calendarWrap}/>
          <h2 data-testid="question">{state.surveyResult.question}</h2>
        </hgroup>
        <FlipMove data-testid="answers" className={Styles.answersList}>
          {state.surveyResult.answers.map(answer => 
            <li data-testid="answer-wrap" key={answer.answer} className={answer.isCurrentAccountAnswer ? Styles.active : ''}>
              <img data-testid="image" src={answer.image} alt={answer.answer}/>
              <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
              <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
            </li>
          )}
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
