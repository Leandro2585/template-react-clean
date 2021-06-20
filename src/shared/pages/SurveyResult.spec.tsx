import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyResult } from '@shared/pages'
import { ApiContext } from '@shared/contexts'
import { mockAccountModel } from '@domain/test'

describe('SurveyResult Component', () => {
  test('should present correct initial state', () => {
    render(
      <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
          <SurveyResult/>
      </ApiContext.Provider>
    )
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.getByTestId('error')).not.toBeInTheDocument()
    expect(screen.getByTestId('loading')).not.toBeInTheDocument()
  })
})
