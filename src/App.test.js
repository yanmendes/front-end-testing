import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('should not show the UTM hidden field', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('hidden')).not.toBeVisible()
  })

  it('should render the submit button with proper styles', () => {
    const { getByText } = render(<App />)
    expect(getByText('Submit')).toHaveStyle('width: 100%')
  })

  it('should require the "Password" input', () => {
    const { getByLabelText } = render(<App />)

    expect(getByLabelText('Password')).toBeRequired()
  })
})
