import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithRedux } from './testUtils'
import axios from 'axios'

import App from './App'
jest.mock('axios')

describe('App', () => {
  beforeAll(() => setupMocks())
  afterAll(() => jest.clearAllMocks())

  // Note that these first two tests should keep working.
  // Focus on FUNCTIONALITY, not your implementation
  it('should not submit an invalid form', () => {
    const { getByText } = renderWithRedux(<App />)

    const submitButton = getByText('Submit')
    fireEvent.click(submitButton)
    expect(axios.post).not.toHaveBeenCalled()
  })

  it('should submit a valid form', () => {
    const { getByLabelText, getByText } = renderWithRedux(<App />)

    const password = '123456'
    const email = 'foo@bar.com'
    const utm = 'foogazy'

    fireEvent.input(getByLabelText('Email'), setValue(email))
    fireEvent.input(getByLabelText('Password'), setValue(password))
    fireEvent.input(getByLabelText('Confirm your password'), setValue(password))

    const submitButton = getByText('Submit')
    fireEvent.click(submitButton)

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000', {
      email,
      password,
      utm
    })
  })

  it.only('should print an error message in a failed submission', async () => {
    axios.post.mockRejectedValue('not ok :(')

    const { getByLabelText, getByText, findByText } = renderWithRedux(<App />)

    const password = '123456'
    const email = 'foo@bar.com'

    fireEvent.input(getByLabelText('Email'), setValue(email))
    fireEvent.input(getByLabelText('Password'), setValue(password))
    fireEvent.input(getByLabelText('Confirm your password'), setValue(password))

    const submitButton = getByText('Submit')
    fireEvent.click(submitButton)
    const errorMessage = await findByText(/Something went wrong/)

    expect(errorMessage).toBeVisible()
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
