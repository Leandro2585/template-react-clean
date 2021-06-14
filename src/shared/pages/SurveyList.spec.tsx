import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '@shared/pages'
import { LoadSurveysList } from '@domain/usecases'
import { mockSurveysListModel } from '@domain/test'
import { UnexpectedError } from '@domain/errors'
import { ApiContext } from '@shared/contexts'

class LoadSurveysListSpy implements LoadSurveysList {
  callsCount = 0
  surveys = mockSurveysListModel()
  async loadAll (): Promise<LoadSurveysList.Model> {
    this.callsCount++
    return this.surveys
  }
}

type SutTypes = {
  loadSurveysListSpy: LoadSurveysListSpy;
}

const makeSut = (loadSurveysListSpy = new LoadSurveysListSpy()): SutTypes => {
  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: null }}>
      <Router history={createMemoryHistory()}>
        <SurveyList loadSurveysList={loadSurveysListSpy}/>
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadSurveysListSpy
  }
}

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  test('should call LoadSurveyList', async () => {
    const { loadSurveysListSpy } = makeSut()
    expect(loadSurveysListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('should render SurveyList on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyItemWrap').length).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('should render error on failure', async () => {
    const loadSurveysListSpy = new LoadSurveysListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveysListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveysListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('should call LoadSurveysList on reload', async () => {
    const loadSurveysListSpy = new LoadSurveysListSpy()
    jest.spyOn(loadSurveysListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveysListSpy)
    await waitFor(() => screen.getByRole('heading'))
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadSurveysListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
})
