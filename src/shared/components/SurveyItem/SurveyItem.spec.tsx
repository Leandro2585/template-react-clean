import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyItem } from './'
import { mockSurveyModel } from '@domain/test'

describe('SurveyItem Component', () => {
  test('should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.date = new Date('2021-01-10T00:00:00')
    render(<SurveyItem survey={survey}/>)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })
})
