import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyResult } from '@shared/pages'
import { ApiContext } from '@shared/contexts'
import { mockAccountModel } from '@domain/test'

const makeSut = (): void => {
  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
        <SurveyResult/>
    </ApiContext.Provider>
  )
}

describe('SurveyResult Component', () => {
  test('should present correct initial state', () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.getByTestId('error')).not.toBeInTheDocument()
    expect(screen.getByTestId('loading')).not.toBeInTheDocument()
  })

  expect('should call present LoadSurveyResult', () => {

  })
})
