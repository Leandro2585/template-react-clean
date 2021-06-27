import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveyResult } from '@shared/pages'
import { ApiContext } from '@shared/contexts'
import { LoadSurveyResultSpy, mockAccountModel } from '@domain/test'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
}

const makeSut = (): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy}/>
    </ApiContext.Provider>
  )

  return {
    loadSurveyResultSpy
  }
}

describe('SurveyResult Component', () => {
  test('should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.getByTestId('error')).not.toBeInTheDocument()
    expect(screen.getByTestId('loading')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  test('should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })
})
