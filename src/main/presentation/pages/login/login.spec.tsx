import React from 'react'
import { render } from '@testing-library/react'
import Login from '.'

describe('Login Component', () => {
  test('should', () => {
    render(<Login/>)
    expect(2 + 2).toBe(4)
  })
})
