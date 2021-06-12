import faker from 'faker'
import { fireEvent, screen } from '@testing-library/react'

export const testChildCount = (field: string, count: number): void => {
  const errorWrap = screen.getByTestId(field)
  expect(errorWrap.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (fieldName: string, validationError: string = '') => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const testElementExists = (fieldName: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

export const populateField = (fieldName: string, value = faker.random.word()) => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

export const testElementText = (fieldName: string, text: string) => {
  const element = screen.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}
