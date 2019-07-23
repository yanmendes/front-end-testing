import axios from 'axios'

export const types = {
  SUBMIT_FORM: 'submit_form',
  SUBMIT_FORM_SUCCESS: 'submit_form_success',
  SUBMIT_FORM_ERROR: 'submit_form_error'
}

export const submitForm = user => dispatch =>
  dispatch({
    type: types.SUBMIT_FORM,
    request: axios
      .post('http://localhost:5000', user)
      .then(_ =>
        dispatch({
          type: types.SUBMIT_FORM_SUCCESS
        })
      )
      .catch(_ =>
        dispatch({
          type: types.SUBMIT_FORM_ERROR
        })
      )
  })
