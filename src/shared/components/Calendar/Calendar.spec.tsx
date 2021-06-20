import React from 'react'
import { render, screen } from '@testing-library/react'
import { Calendar } from '@shared/components'

const makeSut = (date: Date) => {
  render(<Calendar date={date}/>)
}

describe('Calendar Component', () => {
  test('should render with correct values', () => {
    makeSut(new Date('2021-01-10T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })
})
