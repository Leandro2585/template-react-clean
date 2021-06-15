import React from 'react'
import { render, screen } from '@testing-library/react'
import { mockSurveyModel } from '@domain/test'
import SurveyItem from '.'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey}/>)
}

describe('SurveyItem Component', () => {
  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      date: new Date('2021-01-10T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('question').textContent).toBe(survey.question)
    expect(screen.getByTestId('day').textContent).toBe('10')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year').textContent).toBe('2021')
  })

  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      date: new Date('2020-05-03T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('question').textContent).toBe(survey.question)
    expect(screen.getByTestId('day').textContent).toBe('03')
    expect(screen.getByTestId('month').textContent).toBe('mai')
    expect(screen.getByTestId('year').textContent).toBe('2020')
  })
})
