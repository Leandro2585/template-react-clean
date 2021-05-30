import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { FormContext } from '@shared/contexts'
import Input from './'

const makeSut = (): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name="field"/>
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const sut = makeSut()
    const input = sut.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
