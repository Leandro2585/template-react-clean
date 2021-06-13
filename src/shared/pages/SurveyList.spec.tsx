import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '@shared/pages'
import { LoadSurveysList } from '@domain/usecases'
import { mockSurveysListModel } from '@domain/test'

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

const makeSut = (): SutTypes => {
  const loadSurveysListSpy = new LoadSurveysListSpy()
  render(<SurveyList loadSurveysList={loadSurveysListSpy}/>)
  return {
    loadSurveysListSpy
  }
}

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toHaveLength(4)
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
  })
})
