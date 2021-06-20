import React from 'react'
import { render, screen } from '@testing-library/react'
import { mockSurveyModel } from '@domain/test'
import { SurveyItem } from '@shared/components'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey}/>)
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
})
