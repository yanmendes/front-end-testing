import 'antd/dist/antd.css'
import React from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'

import { submitForm } from './redux/actions'

const validateSubmission = (pass1, pass2) => pass1 && pass1 === pass2

const App = ({ error, isLoading, message, submitForm }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [utm, setUtm] = React.useState('')
  const handleChange = setter => e => setter(e.target.value)
  const handleSubmit = e =>
    e.preventDefault() ||
    (validateSubmission(password, confirmPassword) &&
      submitForm({ email, password, utm }))

  React.useEffect(() => {
    setUtm('foogazy')
  }, [])

  const disabledCss = !isLoading
    ? {}
    : {
      pointerEvents: 'none',
      opacity: 0.5,
      background: '#ccc'
    }

  const spinnerCSS = !isLoading
    ? { display: 'none' }
    : {
      position: 'fixed',
      top: '50%',
      left: '50%',
      display: 'block'
    }

  if (error) return <p>{message}</p>

  return (
    <div
      style={{
        width: '50%',
        margin: 'auto',
        marginTop: '50px',
        ...disabledCss
      }}
    >
      <Spin style={spinnerCSS} />
      <form onSubmit={handleSubmit}>
        <input type='hidden' data-testid='hidden' value={utm} />
        <div className='form-group'>
          <label className='form-check-label' id='emailLabel'>
            Email
          </label>
          <input
            aria-labelledby='emailLabel'
            className='form-control'
            name='email'
            type='text'
            required
            value={email}
            onChange={handleChange(setEmail)}
          />
        </div>
        <div className='form-group'>
          <label className='form-check-label' id='passwordLabel'>
            Password
          </label>
          <input
            aria-labelledby='passwordLabel'
            className='form-control'
            name='password'
            type='password'
            required
            value={password}
            onChange={handleChange(setPassword)}
          />
        </div>
        <div className='form-group'>
          <label className='form-check-label' id='confirmPasswordLabel'>
            Confirm your password
          </label>
          <input
            aria-labelledby='confirmPasswordLabel'
            className='form-control'
            name='confirm-password'
            type='password'
            required
            value={confirmPassword}
            onChange={handleChange(setConfirmPassword)}
          />
        </div>
        <button
          style={{ width: '100%' }}
          className='btn btn-primary'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = ({ error, isLoading, message }) => ({
  error,
  isLoading,
  message
})

const mapDispatchToProps = dispatch => ({
  submitForm: user => dispatch(submitForm(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
