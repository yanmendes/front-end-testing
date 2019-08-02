import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import axios from 'axios'

import App from './App'
jest.mock('axios')

describe('App', () => {
  beforeAll(() => setupMocks())
  afterAll(() => jest.clearAllMocks())

  // Example of bad test that just asserts your implementation
  it('should persist inputs fed to form fields', () => {
    const { getByLabelText } = render(<App />)

    const passwordInput = getByLabelText('Password')
    expect(passwordInput).toHaveValue('')
    fireEvent.input(passwordInput, setValue('123456'))
    expect(passwordInput).toHaveValue('123456')
  })

  it('should not submit an invalid form', () => {
    const { getByText } = render(<App />)

    const submitButton = getByText('Submit')
    fireEvent.click(submitButton)
    expect(axios.post).not.toHaveBeenCalled()
  })

  it('should submit a valid form', () => {
    const { getByLabelText, getByText } = render(<App />)

    const password = '123456'
    const email = 'foo@bar.com'

    fireEvent.input(getByLabelText('Email'), setValue(email))
    fireEvent.input(getByLabelText('Password'), setValue(password))
    fireEvent.input(getByLabelText('Confirm your password'), setValue(password))

    const submitButton = getByText('Submit')
    fireEvent.click(submitButton)

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000', {
      email,
      password
    })
  })
})

const setValue = value => ({ target: { value } })

const setupMocks = () => {
  axios.post.mockResolvedValue('ok!')
  /* The "submit" event handler hasn't yet been implemented for @testing-library
       This is a work around to prevent an ugly console.error
       https://github.com/facebook/jest/pull/5267 */
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
}
