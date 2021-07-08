import React from 'react'
import { RecoilRoot } from 'recoil'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '@shared/pages'
import { LoadSurveysList } from '@domain/usecases'
import { mockAccountModel, mockSurveysListModel } from '@domain/test'
import { AccessDeniedError, UnexpectedError } from '@domain/errors'
import { AccountModel } from '@domain/models'
import { currentAccountState } from '@shared/atoms'

class LoadSurveysListSpy implements LoadSurveysList {
  callsCount = 0
  surveys = mockSurveysListModel()
  async loadAll (): Promise<LoadSurveysList.Model[]> {
    this.callsCount++
    return this.surveys
  }
}

type SutTypes = {
  history: MemoryHistory;
  setCurrentAccountMock(account: AccountModel): void;
  loadSurveysListSpy: LoadSurveysListSpy;

}

const makeSut = (loadSurveysListSpy = new LoadSurveysListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }

  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router history={history}>
        <SurveyList loadSurveysList={loadSurveysListSpy}/>
      </Router>
    </RecoilRoot>
  )
  return {
    history,
    setCurrentAccountMock,
    loadSurveysListSpy
  }
}

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
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
    expect(surveyList.querySelectorAll('li').length).toBe(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('should render error on UnexpectedError', async () => {
    const loadSurveysListSpy = new LoadSurveysListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveysListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveysListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('should logout on AccessDeniedError', async () => {
    const loadSurveyList = new LoadSurveysListSpy()
    jest.spyOn(loadSurveyList, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock, history } = makeSut(loadSurveyList)
    await waitFor(() => screen.getByRole('heading'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
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
