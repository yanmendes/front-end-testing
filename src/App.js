import React from 'react'
import axios from 'axios'

const sendDataToApi = data => axios.post('http://localhost:5000', data)
const validateSubmission = (pass1, pass2) => pass1 && pass1 === pass2

const App = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [utm, setUtm] = React.useState('')
  const handleChange = setter => e => setter(e.target.value)
  const handleSubmit = _ =>
    validateSubmission(password, confirmPassword) &&
    sendDataToApi({ email, password, utm })

  React.useEffect(() => {
    setUtm('foogazy')
  }, [])

  return (
    <div style={{ width: '50%', margin: 'auto', marginTop: '50px' }}>
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

export default App
