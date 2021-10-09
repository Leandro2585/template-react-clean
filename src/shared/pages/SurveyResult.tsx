import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router-dom'
import { LoadSurveyResult, SaveSurveyResult } from '@domain/usecases'
import { Calendar, Header, Loading, Error, Answer } from '@shared/components'
import { useErrorHandler } from '@shared/hooks'
import { surveyResultState, onSurveyAnswerState } from '@shared/atoms'
import Styles from '@shared/styles/surveyresult.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({
      ...old,
      surveyResult: null,
      isLoading: false,
      error: error.message
    }))
  })

  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => {
        setState(old => ({ ...old, surveyResult, isLoading: false }))
      })
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
    setOnAnswer({ onAnswer })
  }, [])

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

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
            {state.surveyResult.answers.map(answer => <Answer key={answer.answer} answer={answer}/>)}
          </FlipMove>
          <button data-testid="back-button" onClick={goBack}>Voltar</button>
          { state.isLoading && <Loading/>}
          { state.error && <Error error={state.error} reload={reload}/>}
        </>}
        </div>
      </div>
  )
}

export default SurveyResult
