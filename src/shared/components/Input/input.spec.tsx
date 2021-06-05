import React from 'react'
import faker from 'faker'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { FormContext } from '@shared/contexts'
import Input from './'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name={fieldName}/>
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('should remove readOnly on focus', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })

  test('should focus input label click', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field)
    const label = sut.getByTestId(`${field}-label`)
    fireEvent.click(label)
    expect(document.activeElement).toBe(input)
  })
})
