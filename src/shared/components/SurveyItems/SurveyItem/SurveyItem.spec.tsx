import React from 'react'
import { Router } from 'react-router-dom'
import { MemoryHistory, createMemoryHistory } from 'history'
import { fireEvent, render, screen } from '@testing-library/react'
import { mockSurveyModel } from '@domain/test'
import { SurveyItem } from '@shared/components'

type SutTypes = {
  history: MemoryHistory;
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <SurveyItem survey={survey}/>
    </Router>
  )
  return { history }
}

describe('SurveyItem Component', () => {
  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true
    })
    makeSut(survey)
    expect(screen.getByTestId('question').textContent).toBe(survey.question)
  })

  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false
    })
    makeSut(survey)
    expect(screen.getByTestId('question').textContent).toBe(survey.question)
  })

  test('should go to SurveyResult', () => {
    const survey = mockSurveyModel()
    const { history } = makeSut(survey)
    fireEvent.click(screen.getByTestId('link'))
    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
