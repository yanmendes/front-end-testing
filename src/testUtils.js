import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { render } from '@testing-library/react'

import reducer from './redux/reducer'

export const renderWithRedux = (
  ui,
  {
    initialState = {},
    store = createStore(reducer, initialState, applyMiddleware(thunk))
  } = {}
) => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  store
})
