import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import { LoadSurveyResult, SaveSurveyResult } from '@domain/usecases'
import { Calendar, Header, Loading, Error, Answer } from '@shared/components'
import Styles from '@shared/styles/surveyresult.scss'
import { useErrorHandler } from '@shared/hooks'
import { useHistory } from 'react-router-dom'
import { AnswerContext } from '@shared/contexts'
import { SaveSurveyResultSpy } from '@domain/test'

type Props = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
}

type State = {
  isLoading: boolean;
  error: string;
  reload: boolean;
  surveyResult: LoadSurveyResult.Model;
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useState<State>({
    isLoading: false,
    error: '',
    reload: false,
    surveyResult: null as LoadSurveyResult.Model
  })

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({
      ...old,
      surveyResult: null,
      isLoading: false,
      error: error.message
    }))
  })

  const onAnswer = (answer: string): void => {
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then()
      .catch(handleError)
  }

  const reload = (): void => {
    setState((old) => ({
      isLoading: false,
      surveyResult: null,
      error: '',
      reload: !old.reload
    }))
  }

  const { goBack } = useHistory()

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  return (
    <AnswerContext.Provider value={{ onAnswer }}>
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
            {state.surveyResult.answers.map(answer => <Answer key={answer.answer} answer={answer}/>)}
          </FlipMove>
          <button data-testid="back-button" onClick={goBack}>Voltar</button>
          { state.isLoading && <Loading/>}
          { state.error && <Error error={state.error} reload={reload}/>}
        </>}
        </div>
      </div>
    </AnswerContext.Provider>
  )
}

export default SurveyResult
