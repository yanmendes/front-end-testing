import { types } from './actions'

export const initialState = {
  isLoading: false,
  message: '',
  error: false
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case types.SUBMIT_FORM:
      return {
        ...state,
        isLoading: true
      }
    case types.SUBMIT_FORM_ERROR:
      return {
        error: true,
        isSubmiting: false,
        message: 'Something went wrong while submiting the form'
      }
    case types.SUBMIT_FORM_SUCCESS:
      return {
        error: false,
        isSubmiting: false,
        message: 'Form sent successfully'
      }
    default:
      return state
  }
}

export default order
